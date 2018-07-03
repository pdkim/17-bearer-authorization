'use strict';

import mongoose from 'mongoose';

const sleeperSchema = new mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  Name: {type: String, required: true, unique: true},
  Allowed: {type: Boolean, required: true},
});


export default mongoose.model('Sleeper', sleeperSchema);