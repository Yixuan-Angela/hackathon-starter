const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const postingsSchema = new mongoose.Schema({
  "referenceID": { type: String, unique: true },
  "title":String,
  "userEmail": String,
  "price": Number,
  "maxPeople": Number,
  "postingDate": Date,

  "adress": {
    "streetAddress": String,
    "city": String,
    "zip": Number,
    "picture": String
  }
});


const Postings = mongoose.model('Postings', postingsSchema);

module.exports = Postings;
