const Hasil_Test = require('../models/Kesehatan/hasilTest');
const User_Wisata = require('../models/Wisata/loginRegis');
const jwt_decode = require('jwt-decode');

const cekTest = async (req, res) => {
  const { NIK } = req.body;

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

  // Check empty body request
  if (NIK === '') {
    res.render('../views/Wisata/homeWisata.ejs', {
      message: 'Field Cannot Be Empty!!',
      firstName: namaUser.firstName,
      tanggal: today,
      status: 400,
    });
    return res;
  }

  const cek = await Hasil_Test.find({ NIK_pasien: NIK });
  console.log(cek);

  if (cek.length == 0) {
    res.render('../views/Wisata/homeWisata.ejs', {
      message: 'Hasil test tidak ditemukan!',
      firstName: namaUser.firstName,
      tanggal: today,
      status: 400,
    });
    return res;
  }

  res.redirect(`/home_wisata?NIK=${NIK}`);
};

module.exports = cekTest;
