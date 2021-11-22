const mongoose = require('mongoose');

const loginRegisSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  NIK: String,
  noHP: String,
  foto: String,
  password: String,
});

module.exports = mongoose.model('Registrasi_Login_Biasa', loginRegisSchema);
