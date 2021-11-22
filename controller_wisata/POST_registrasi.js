const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User_Wisata = require('../models/Wisata/loginRegis');

const registrasi = async (req, res) => {
  const { firstName, lastName, email, jenis_wisata, noHP, password, confirmPassword } = req.body;

  //   Check empty body request
  if (email === '' || firstName === '' || password === '' || confirmPassword === '' || jenis_wisata === '' || noHP === '') {
    res.render('../views/Wisata/regisWisata.ejs', {
      message: 'All field cannot be empty!',
    });
    res.status(400);
    return res;
  }

  // Check exist email in database
  const cekDB = await User_Wisata.findOne({ email });
  if (cekDB) {
    res.render('../views/Wisata/regisWisata.ejs', {
      message: 'Email already exist!',
    });
    res.status(400);
    return res;
  }

  // Check confirm password
  if (confirmPassword != password) {
    res.render('../views/Wisata/regisWisata.ejs', {
      message: 'Confirm Password and Password must be match!',
    });
    res.status(400);
    return res;
  }

  // Hash user password to DB
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Generate id
  const id = mongoose.Types.ObjectId();

  // Store data to DB
  const registrasi = await new User_Wisata({
    _id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    jenis_wisata: jenis_wisata,
    noHP: noHP,
    password: hashPassword,
  });

  registrasi
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));

  res.redirect('/login_wisata');
};

module.exports = registrasi;
