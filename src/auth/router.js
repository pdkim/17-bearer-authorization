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
      .then(user => {
        console.log('check', user);
        res.send(user.generateToken())
      })
      .catch(next);
  }
});

router.get('/api/sleep/:id', (req, res) => {
  // if(req.params.id === null) {
  //   res.status(404).send('Not Found');
  // }
  // else if(req.params.id === '' || req.params.id === undefined) {
  //   res.status(401).send('Invalid request');
  // }
  // else{
    User.findById(req.params.id)
    .then(user => {
      res.json(user);
    })
});

router.put('/api/sleep/:id', (req, res) => {
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
    User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => {
      res.json(user);
    })
  // }
})

router.delete('/api/sleep/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send('User Deleted');
    })
})

export default router;