const User_Kesehatan = require('../models/Kesehatan/loginRegis');
const jwt_decode = require('jwt-decode');

const getHome = async (req, res) => {
  if (!req.user) {
    res.render('../views/Kesehatan/loginKesehatan.ejs', {
      message: 'You must login first!',
      status: 400,
    });
    return res;
  }

  // User firstname
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

  res.render('../views/Kesehatan/homeKesehatan.ejs', {
    firstName: namaUser.firstName,
    tanggal: today,
  });
};

module.exports = getHome;
