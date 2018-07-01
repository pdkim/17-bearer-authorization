'use strict';

import express from 'express';

const router = express.Router();

import User from './models.js';
import Sleeper from './sleepers.js'
import auth from './middleware.js';


//sign up
router.post('/api/signup', (req, res) => {
  let user = new User(req.body);
  if (Object.keys(req.body).length === 0) {
    res.status(400).send('Bad Request');
  }
  else {
    user.save()
      .then(user => res.send(user.generateToken()))
      .catch(err => console.error(err));
  }
});

//sign in
router.get('/api/signin', auth, (req, res) => {
  if (req.body === null) {
    res.status(401).send('Unauthorized');
  }
  else {
    res.cookie('Token', req.token);
    res.send('This is a test');
  }
});

//POST sleeper
router.post('/api/sleep', auth, (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send('Bad Request');
  }
  else {
    Sleeper.create(req.body)
      .then(snooze => {
        console.log('check', snooze);
        res.json(snooze);
      })
      .catch(next);
  }
});

router.get('/api/sleep/', auth, (req, res, next) => {
  console.log(req.params);
  Sleeper.find()
    .then(snooze => {
      res.json(snooze);
    })
    .catch(next);
});

//GET sleeper
router.get('/api/sleep/:id', auth, (req, res, next) => {
  console.log(req.params);
  if (req.params.id.length < 24) {
    res.status(404).send('Not Found');
  }
  else {
    Sleeper.findById(req.params.id)
      .then(snooze => {
        res.json(snooze);
      })
      .catch(next);
  }
});

//PUT sleeper
router.put('/api/sleep/:id', auth, (req, res) => {
  if (req.params.id === null) {
    res.status(404).send('Not Found');
  }
  else if (Object.keys(req.body).length === 0) {
    res.status(400).send('Bad Request');
  }
  else {
    Sleeper.findByIdAndUpdate(req.params.id, req.body)
      .then(snooze => {
        res.json(snooze);
      })
  }
})


//DELETE sleeper
router.delete('/api/sleep/:id', auth, (req, res) => {
  Sleeper.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send('You are no longer allowed here!');
    })
})

export default router;