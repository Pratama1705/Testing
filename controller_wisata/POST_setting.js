const User_Wisata = require('../models/Wisata/loginRegis');
const jwt_decode = require('jwt-decode');
const bcrypt = require('bcrypt');

const ubahProfile = async (req, res) => {
  const { firstName, lastName, email, jenis_wisata, noHP, password, confirmPassword } = req.body;

  // User profile
  const token = req.user;
  const decoded = jwt_decode(token);
  const profile = await User_Wisata.findOne({ _id: decoded.id });

  //   Check empty body request
  if (email === '' || firstName === '' || password === '' || confirmPassword === '' || noHP === '' || jenis_wisata === '') {
    res.render('../views/Wisata/settingWisata.ejs', {
      message: 'All field cannot be empty except last name!',
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      jenis_wisata: profile.jenis_wisata,
      noHP: profile.noHP,
    });
    return res;
  }

  // Check confirm password
  if (confirmPassword != password) {
    res.render('../views/Wisata/settingWisata.ejs', {
      message: 'Password and Confirm Pass didnt match!',
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      jenis_wisata: profile.jenis_wisata,
      noHP: profile.noHP,
    });
    return res;
  }

  // Hash user password to DB
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // const token = req.user;
  // const decoded = jwt_decode(token);

  // Store data to DB
  const cariUbah = await User_Wisata.findOne({ _id: decoded.id });
  cariUbah.firstName = firstName;
  cariUbah.lastName = lastName;
  cariUbah.email = email;
  cariUbah.jenis_wisata = jenis_wisata;
  cariUbah.noHP = noHP;
  cariUbah.password = hashPassword;

  cariUbah
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));

  res.redirect('/home_wisata');
};

module.exports = ubahProfile;
