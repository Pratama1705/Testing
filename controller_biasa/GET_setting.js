const Registrasi_Login_Biasa = require('../models/Biasa/loginRegisBiasa');
const jwt_decode = require('jwt-decode');

const setting = async (req, res) => {
  if (!req.user) {
    res.render('../views/Warga/loginBiasa.ejs', {
      message: 'You must login first!',
      status: 400,
    });
    return res;
  }

  // User profile
  const token = req.user;
  const decoded = jwt_decode(token);
  const profile = await Registrasi_Login_Biasa.findOne({ _id: decoded.id });

  console.log(profile);

  res.render('../views/Warga/settingBiasa.ejs', {
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    NIK: profile.NIK,
    noHP: profile.noHP,
    status: 200,
  });
};

module.exports = setting;
