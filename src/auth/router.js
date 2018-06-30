'use strict';

import express from 'express';

const router = express.Router();

import User from './models.js';
import auth from './middleware.js';

router.post('/api/sleep', (req, res, next) => {
  if(Object.keys(req.body).length === 0) {
    res.status(400).send('Bad Request');
  }
  else{
    User.create(req.body)
      .then(user => res.send(user.generateToken()))
      .catch(next);
  }
});

router.get('/api/sleep/:id', auth, (req, res) => {
  // if(req.params.id === null) {
  //   res.status(404).send('Not Found');
  // }
  // else if(req.params.id === '' || req.params.id === undefined) {
  //   res.status(401).send('Invalid request');
  // }
  // else{
    res.cookie('Token: ', req.token);
    res.send(req.token);
  // }
});

router.put('api/sleep/:id', auth, (req, res) => {
  // if(req.params.id === null) {
  //   res.status(404).send('Not Found');
  // }
  // else if(req.params.id === '' || req.params.id === undefined) {
  //   res.status(401).send('Invalid Request');
  // }
  // else if(req.body === null) {
  //   res.status(400).send('Bad Request');
  // }
  // else {
  User.set(User.body, req.body);
  User.save()
    .then(user => {
      res.send(user.generateToken(), 'Credentials updated');
    })
  // }
})

router.delete('api/sleep/:id', auth, (req, res) => {
  User.deleteOne(req.params.id)
    .then(() => {
      res.send('User Deleted');
    })
})

export default router;