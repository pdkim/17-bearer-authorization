'use strict';

import User from './models.js';

export default (req, res, next) => {

  let authorize = (token) => {
    User.authorize(token)
    .then(user => {
      if(!user) {
        getAuth();
      }
      else{ 
        next(); 
      }
    })
    .catch(next);
};

  let authenticate = (auth) => {
    User.authenticate(auth)
      .then(user => {
        if(!user) {
          getAuth();
        }
        else{
          req.token = user.generateToken();
          next();
        }
      })
      .catch(next);
  };

  let getAuth = () => {
    next({status: 401, statusMessage: 'Unauthorized', message: 'Invalid user or password!'});
  };

  try {
    let auth = {};
    let authHeader = req.header.authorization;

    if(!authHeader) {
      return getAuth();
    }

    if(authHeader.match(/basic/i)) {
      
      let base64Header = authHeader.replace(/Basic\s+/i, '');
      let base64Buffer = Buffer.from(base64Header,'base64');
      let bufferString = base64Buffer.toString();
      let [username,password] = bufferString.split(':');
      auth = {username,password};

      authenticate(auth);
    }

    else if(authHeader.match(/bearer/i)) {
      let token = authHeader.replace(/bearer\s+/i, '');
      authorize(token);
    }
  }
  catch(e) {
    next(e);
  }
};