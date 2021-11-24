const mongoose = require('mongoose');

const loginRegisSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  NIK: String,
  noHP: String,
  foto: String,
  password: String,
  keterangan: Array,
});

module.exports = mongoose.model('User_Warga', loginRegisSchema);
