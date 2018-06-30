'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import router from '../src/auth/router.js';
import errorHandler from '../src/middleware/error.js';
import notFound from '../src/middleware/404.js';

let app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(router);

app.use(errorHandler);
app.use(notFound);

let server;

module.exports = {

  start: (port) => {
    if(!server) {
      server = app.listen(port, (err) => {
        if(err) {throw err;}
        console.log(`Server running at port ${port}`);
      });
    }
  },

  stop: () => {
    server.close( () => {
      console.log('Server is offline');
    });
  },
};