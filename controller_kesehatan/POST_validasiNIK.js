const Warga = require('../models/Biasa/loginRegisBiasa');
const User_Kesehatan = require('../models/Kesehatan/loginRegis');
const jwt_decode = require('jwt-decode');

const cekNIK = async (req, res) => {
  const { NIK } = req.body;

  const token = req.user;
  const decoded = jwt_decode(token);
  const namaUser = await User_Kesehatan.findOne({ _id: decoded.id });

  var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth();
  var thisDay = date.getDay(),
    thisDay = myDays[thisDay];
  var yy = date.getYear();
  var year = yy < 1000 ? yy + 1900 : yy;
  var today = thisDay + ', ' + day + ' ' + months[month] + ' ' + year;

  if (NIK === '') {
    res.render('../views/Kesehatan/homeKesehatan.ejs', {
      message: 'Inputan NIK tidak boleh kosong!',
      firstName: namaUser.firstName,
      tanggal: today,
    });
    return res;
  }

  const hasilNIK = await Warga.findOne({ NIK: NIK });

  if (!hasilNIK) {
    res.render('../views/Kesehatan/homeKesehatan.ejs', {
      message: 'NIK tidak ditemukan di sistem!',
      firstName: namaUser.firstName,
      tanggal: today,
    });
    return res;
  }

  res.render('../views/Kesehatan/validationKesehatan.ejs', {
    foto: hasilNIK.foto,
    nama: hasilNIK.firstName + ' ' + hasilNIK.lastName,
    NIK: hasilNIK.NIK,
  });
};

module.exports = cekNIK;
