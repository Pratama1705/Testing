const DB_User = require('../models/Biasa/personalBiasa');
const Registrasi_Login_Biasa = require('../models/Biasa/loginRegisBiasa');
const Hasil_Test = require('../models/Kesehatan/hasilTest');
const jwt_decode = require('jwt-decode');

const getHome = async (req, res) => {
  if (!req.user) {
    res.render('../views/Warga/loginBiasa.ejs', {
      message: 'You must login first!',
      status: 400,
    });
    return res;
  }

  // User firstname
  const token = req.user;
  const decoded = jwt_decode(token);

  const namaUser = await Registrasi_Login_Biasa.findOne({ _id: decoded.id });

  const cariDataTest = await Hasil_Test.find({ NIK_pasien: namaUser.NIK });

  // Data test
  const dataTest = await DB_User.findOne({ _id: decoded.id });

  cariDataTest.forEach((e) => {
    dataTest.keterangan.unshift(e);
  });

  // Cek data test kosong atau enggak
  if (dataTest.keterangan.length == 0) {
    res.render('../views/Warga/homeBiasa.ejs', {
      firstName: namaUser.firstName,
      dataTest: {
        nama: `${namaUser.firstName} ${namaUser.lastName}`,
        NIK: `${namaUser.NIK}`,
        messageData: 'Anda belum memiliki record test!',
        status: 200,
      },
    });
    return res;
  }

  // Tanggal hari dipost dan hasil keluar
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

  res.render('../views/Warga/homeBiasa.ejs', {
    firstName: namaUser.firstName,
    lastName: namaUser.lastName,
    tanggal: today,
    dataTest: dataTest.keterangan,
  });
};

module.exports = getHome;
