const User_Wisata = require('../models/Wisata/loginRegis');
const jwt_decode = require('jwt-decode');

const setting = async (req, res) => {
  if (!req.user) {
    res.render('../views/Wisata/loginWisata.ejs', {
      message: 'You must login first!',
      status: 400,
    });
    return res;
  }

  // User profile
  const token = req.user;
  const decoded = jwt_decode(token);
  const profile = await User_Wisata.findOne({ _id: decoded.id });

  res.render('../views/Wisata/settingWisata.ejs', {
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    jenis_wisata: profile.jenis_wisata,
    noHP: profile.noHP,
    status: 200,
  });
};

module.exports = setting;
