const mongoose = require('mongoose');

const hasilTestSchema = mongoose.Schema({
  id_pengetest: String,
  NIK_pasien: String,
  hasil_test: String,
  jenis_test: String,
  tanggal_test: String,
  lokasi_test: String,
});

module.exports = mongoose.model('Hasil_Test', hasilTestSchema);
