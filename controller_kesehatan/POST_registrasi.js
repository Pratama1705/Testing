const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User_Kesehatan = require('../models/Kesehatan/loginRegis');

const registrasi = async (req, res) => {
  const { firstName, lastName, email, institusi, noHP, password, confirmPassword } = req.body;

  //   Check empty body request
  if (email === '' || firstName === '' || password === '' || confirmPassword === '' || institusi === '' || noHP === '') {
    res.status(400);
    res.render('../views/Kesehatan/regisKesehatan.ejs', {
      message: 'Except last name, all field cannot be empty!',
    });
    return res;
  }

  // Check exist email in database
  const cekDB = await User_Kesehatan.findOne({ email });
  if (cekDB) {
    res.status(400);
    res.render('../views/Kesehatan/regisKesehatan.ejs', {
      message: 'Email already exist!',
    });
    return res;
  }

  // Check confirm password
  if (!confirmPassword === password) {
    res.status(400);
    res.render('../views/Kesehatan/regisKesehatan.ejs', {
      message: 'Confirm Password and Password must be same!',
    });
    return res;
  }

  // Hash user password to DB
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Generate id
  const id = mongoose.Types.ObjectId();

  // Store data to DB
  const registrasi = await new User_Kesehatan({
    _id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    institusi: institusi,
    noHP: noHP,
    password: hashPassword,
  });

  registrasi
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));

  res.redirect('/login_kesehatan');
};

module.exports = registrasi;
