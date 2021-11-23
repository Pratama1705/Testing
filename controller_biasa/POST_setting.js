const Registrasi_Login_Biasa = require('../models/Biasa/loginRegisBiasa');
const jwt_decode = require('jwt-decode');
const bcrypt = require('bcrypt');

const ubahProfile = async (req, res) => {
  const { firstName, lastName, email, noHP, password, confirmPassword } = req.body;

  // User profile
  const token = req.user;
  const decoded = jwt_decode(token);
  const profile = await Registrasi_Login_Biasa.findOne({ _id: decoded.id });

  //   Check empty body request
  if (email === '' || firstName === '' || password === '' || confirmPassword === '' || noHP === '') {
    res.render('../views/Warga/settingBiasa.ejs', {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      NIK: profile.NIK,
      noHP: profile.noHP,
      message: 'Except Last Name, All Field Cannot Be Empty!!',
    });
    res.status(400);
    return res;
  }

  // Check confirm password
  if (confirmPassword != password) {
    res.render('../views/Warga/settingBiasa.ejs', {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      NIK: profile.NIK,
      noHP: profile.noHP,
      message: 'Confirm password and password must be match!',
    });
    res.status(400);
    return res;
  }

  // Hash user password to DB
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Store data to DB
  const cariUbah = await Registrasi_Login_Biasa.findOne({ _id: decoded.id });
  cariUbah.firstName = firstName;
  cariUbah.lastName = lastName;
  cariUbah.email = email;
  cariUbah.noHP = noHP;
  cariUbah.password = hashPassword;

  cariUbah
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));

  res.redirect('/home_biasa');
};

module.exports = ubahProfile;
