const mongoose = require('mongoose');

const loginRegisSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  institusi: String,
  noHP: String,
  password: String,
});

module.exports = mongoose.model('User_Kesehatan', loginRegisSchema);
