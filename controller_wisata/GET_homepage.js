const User_Wisata = require('../models/Wisata/loginRegis');
const jwt_decode = require('jwt-decode');
const Hasil_Test = require('../models/Kesehatan/hasilTest');
const Registrasi_Login_Biasa = require('../models/Biasa/loginRegisBiasa');

const getHome = async (req, res) => {
  if (!req.user) {
    res.render('../views/Wisata/loginWisata.ejs', {
      message: 'You must login first!',
      status: 400,
    });
    return res;
  }

  const { NIK } = req.query;

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

  // User firstname
  const token = req.user;
  const decoded = jwt_decode(token);
  const namaUser = await User_Wisata.findOne({ _id: decoded.id });

  if (!NIK) {
    res.render('../views/Wisata/homeWisata.ejs', {
      firstName: namaUser.firstName,
      tanggal: today,
    });
    return res;
  }

  const cek = await Hasil_Test.find({ NIK_pasien: NIK });

  if (cek.length === 0) {
    res.render('../views/Wisata/homeWisata.ejs', {
      message: 'Hasil test tidak ditemukan!',
      firstName: namaUser.firstName,
      tanggal: today,
      status: 400,
    });
    return res;
  }

  const nama = await Registrasi_Login_Biasa.findOne({ NIK: NIK });
  const dataTerakhir = cek[cek.length - 1];

  let ketentuan = '';

  if (dataTerakhir.hasil_test.toUpperCase() === 'POSITIVE' || dataTerakhir.hasil_test.toUpperCase() === 'POSITIF') {
    ketentuan = 'DILARANG MASUK!';
  } else {
    ketentuan = 'DIIZINKAN MASUK!';
  }

  res.render('../views/Wisata/homeWisata.ejs', {
    firstName: namaUser.firstName,
    tanggal: today,
    nama: nama,
    dataTest: dataTerakhir,
    ketentuan: ketentuan,
  });
};

module.exports = getHome;
