const User_Kesehatan = require('../models/Kesehatan/loginRegis');
const jwt_decode = require('jwt-decode');
const bcrypt = require('bcrypt');

const ubahProfile = async (req, res) => {
  const { firstName, lastName, email, institusi, noHP, password, confirmPassword } = req.body;

  // User profile
  const token = req.user;
  const decoded = jwt_decode(token);
  const profile = await User_Kesehatan.findOne({ _id: decoded.id });

  //   Check empty body request
  if (email === '' || firstName === '' || password === '' || confirmPassword === '' || noHP === '' || institusi === '') {
    res.render('../views/Kesehatan/settingKesehatan.ejs', {
      message: 'All field cannot be empty except last name!',
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      institusi: profile.institusi,
      noHP: profile.noHP,
    });
    return res;
  }

  // Check confirm password
  if (confirmPassword != password) {
    res.render('../views/Kesehatan/settingKesehatan.ejs', {
      message: 'Password and confirm password must be match!',
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      institusi: profile.institusi,
      noHP: profile.noHP,
    });
    return res;
  }

  // Hash user password to DB
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Store data to DB
  const cariUbah = await User_Kesehatan.findOne({ _id: decoded.id });
  cariUbah.firstName = firstName;
  cariUbah.lastName = lastName;
  cariUbah.email = email;
  cariUbah.institusi = institusi;
  cariUbah.noHP = noHP;
  cariUbah.password = hashPassword;

  cariUbah
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));

  res.redirect('/home_kesehatan');
};

module.exports = ubahProfile;
