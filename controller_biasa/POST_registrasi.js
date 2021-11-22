const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Registrasi_Login_Biasa = require('../models/Biasa/loginRegisBiasa');
const DB_User = require('../models/Biasa/personalBiasa');
const { uploadImage } = require('../uploadFirebaseImage/uploadToStorage');

const registrasi = async (req, res) => {
  const { firstName, lastName, email, NIK, noHP, password, confirmPassword } = req.body;

  //   Check empty body request
  if (email === '' || firstName === '' || password === '' || confirmPassword === '' || NIK === '' || noHP === '') {
    res.status(400);
    res.render('../views/Warga/regisBiasa.ejs', {
      message: 'Except last name, all field cannot be empty!',
    });
    return res;
  }

  // Check exist email in database
  const cekDB = await Registrasi_Login_Biasa.findOne({ email });
  if (cekDB) {
    res.status(400);
    res.render('../views/Warga/regisBiasa.ejs', {
      message: 'Email already used!',
    });
    return res;
  }

  const cekNIK = await Registrasi_Login_Biasa.findOne({ NIK: NIK });
  if (cekNIK) {
    res.status(400);
    res.render('../views/Warga/regisBiasa.ejs', {
      message: 'NIK already used!',
    });
    return res;
  }

  // Check confirm password
  if (confirmPassword != password) {
    res.status(400);
    res.render('../views/Warga/regisBiasa.ejs', {
      message: 'Confirm pass and pass must be same!',
    });
    return res;
  }

  const file = req.file;
  const url = await uploadImage(file);

  if (url === 'Image Must Be Fill!') {
    res.status(400);
    res.render('../views/Warga/regisBiasa.ejs', {
      message: url,
    });
    return res;
  }

  console.log(url);

  // Hash user password to DB
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  // Generate id
  const id = mongoose.Types.ObjectId();
  // Store data to DB
  const registrasi = await new Registrasi_Login_Biasa({
    _id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    NIK: NIK,
    noHP: noHP,
    foto: url,
    password: hashPassword,
  });
  const personalDB = await new DB_User({
    _id: id,
    NIK: NIK,
    noHP: noHP,
  });
  registrasi
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
  personalDB
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
  res.redirect('/login_biasa');
};

module.exports = registrasi;
