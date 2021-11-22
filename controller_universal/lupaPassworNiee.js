const bcrypt = require('bcrypt');
const sendEmail = require('../forgotPass/kirimEmail');
const Warga = require('../models/Biasa/loginRegisBiasa');
const TenKes = require('../models/Kesehatan/loginRegis');
const Wisata = require('../models/Wisata/loginRegis');

const postLupa = async (req, res) => {
  const { email, select } = req.body;

  console.log(email);
  console.log(select);

  // Check empty body request
  if (email === '') {
    res.render('../views/lupaPass.ejs', {
      message: 'All Field Cannot Be Empty!!',
      status: 400,
    });
    return res;
  }

  if (select === 'Warga') {
    // Check email exist
    const cekDB = await Warga.findOne({ email });
    if (!cekDB) {
      res.render('../views/lupaPass.ejs', {
        message: 'Email Doesnt Exist!',
        status: 400,
      });
      return res;
    }
    const salt = await bcrypt.genSalt(10);
    const kirim = sendEmail(email);
    const hashPassword = await bcrypt.hash('lupaPassword', salt);
    cekDB.password = hashPassword;
    cekDB.save();
    res.render('../views/Warga/loginBiasa.ejs', {
      message: kirim,
    });
  } else if (select === 'TenKes') {
    const cekDB = await TenKes.findOne({ email });
    if (!cekDB) {
      res.render('../views/lupaPass.ejs', {
        message: 'Email Doesnt Exist!',
        status: 400,
      });
      return res;
    }
    const salt = await bcrypt.genSalt(10);
    const kirim = sendEmail(email);
    const hashPassword = await bcrypt.hash('lupaPassword', salt);
    cekDB.password = hashPassword;
    cekDB.save();
    res.render('../views/Kesehatan/loginKesehatan.ejs', {
      message: kirim,
    });
  } else if (select === 'Wisata') {
    console.log('ini wisata');
    const cekDB = await Wisata.findOne({ email });
    if (!cekDB) {
      res.render('../views/lupaPass.ejs', {
        message: 'Email Doesnt Exist!',
        status: 400,
      });
      return res;
    }
    const salt = await bcrypt.genSalt(10);
    const kirim = sendEmail(email);
    const hashPassword = await bcrypt.hash('lupaPassword', salt);
    cekDB.password = hashPassword;
    cekDB.save();
    res.render('../views/Wisata/loginWisata.ejs', {
      message: kirim,
    });
  }
};

module.exports = postLupa;
