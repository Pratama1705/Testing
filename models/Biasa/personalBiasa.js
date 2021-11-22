const mongoose = require('mongoose');

const personalSchema = mongoose.Schema({
  NIK: String,
  noHP: String,
  keterangan: Array,
});

module.exports = mongoose.model('DB_User', personalSchema);
