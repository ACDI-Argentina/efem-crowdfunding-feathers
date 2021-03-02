const mongoose = require('mongoose');

const { Schema } = mongoose;

const SecretCode = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: String,
    ref: 'user',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    expires: 1800, //30 min
  },
});

module.exports.SecretCode = mongoose.model('secretCode', SecretCode);
