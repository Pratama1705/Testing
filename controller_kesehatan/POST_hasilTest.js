const Hasil_Test = require('../models/Kesehatan/hasilTest');
const User_Kesehatan = require('../models/Kesehatan/loginRegis');
const Warga = require('../models/Biasa/loginRegisBiasa');
const jwt_decode = require('jwt-decode');

const hasilTest = async (req, res) => {
  const { testResult, jenisTest } = req.body;
  const { NIK } = req.params;

  const hasilNIK = await Warga.findOne({ NIK: NIK });

  // Check empty body request
  if (testResult === '' || jenisTest === '') {
    // res.render('../views/Kesehatan/validationKesehatan.ejs', {
    //   foto: hasilNIK.foto,
    //   nama: hasilNIK.firstName + ' ' + hasilNIK.lastName,
    //   NIK: hasilNIK.NIK,
    //  message: "Test",
    // });
    res.redirect('/home_kesehatan');
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

  // Id kesehatan
  const token = req.user;
  const decoded = jwt_decode(token);
  const idUserKes = decoded.id;
  const lokasiTest = await User_Kesehatan.findOne({ _id: idUserKes });

  const hasil = await new Hasil_Test({
    id_pengetest: idUserKes,
    NIK_pasien: NIK,
    hasil_test: testResult,
    jenis_test: jenisTest,
    tanggal_test: today,
    lokasi_test: lokasiTest.institusi,
  });

  hasil
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));

  res.redirect('/home_kesehatan');
};

module.exports = hasilTest;
