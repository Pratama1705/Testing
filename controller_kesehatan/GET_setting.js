const User_Kesehatan = require('../models/Kesehatan/loginRegis');
const jwt_decode = require('jwt-decode');

const setting = async (req, res) => {
  if (!req.user) {
    res.render('../views/Kesehatan/loginKesehatan.ejs', {
      message: 'Anda harus login terlebih dahulu!',
    });
    return res;
  }

  // User profile
  const token = req.user;
  const decoded = jwt_decode(token);
  const profile = await User_Kesehatan.findOne({ _id: decoded.id });

  res.render('../views/Kesehatan/settingKesehatan.ejs', {
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    institusi: profile.institusi,
    noHP: profile.noHP,
    status: 200,
  });
};

module.exports = setting;
