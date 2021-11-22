const express = require('express');
const router = express.Router();
const cekCookie = require('../middleware/cekCookie');

// Path Landing Page
router.get('/', (req, res) => {
  res.render('../views/landingPage.ejs');
});

// Path forgot pass biasa
router.get('/lupaPass', (req, res) => {
  res.render('../views/lupaPass.ejs');
});
const lupaPass = require('../controller_universal/lupaPassworNiee');
router.post('/lupaPass', lupaPass);

// Search Engine
const searchData = require('../controller_universal/searchNIK');
router.post('/searchNIK', searchData);

// -------------------------------------------------USER BIASA-----------------------------------------------------------------------
// Path Registrasi
router.get('/registrasi_biasa', (req, res) => {
  res.render('../views/Warga/regisBiasa.ejs');
});
const image = require('../uploadFirebaseImage/uploadImage');
const postRegisBiasa = require('../controller_biasa/POST_registrasi');
router.post('/registrasi_biasa', image.single('imageKTP'), postRegisBiasa);

// Path Login
router.get('/login_biasa', (req, res) => {
  res.render('../views/Warga/loginBiasa.ejs');
});
const postLoginBiasa = require('../controller_biasa/POST_login');
router.post('/login_biasa', postLoginBiasa);

// Path Homepage
const getHome = require('../controller_biasa/GET_homepage');
router.get('/home_biasa', cekCookie, getHome);

// Path Setting
const settingProfile = require('../controller_biasa/GET_setting');
router.get('/setting_biasa', cekCookie, settingProfile);
const postsSetting = require('../controller_biasa/POST_setting');
router.post('/setting_biasa', cekCookie, postsSetting);

// Path Logout
const logoutBiasa = require('../controller_biasa/GET_logout');
router.get('/logout_biasa', cekCookie, logoutBiasa);
// ----------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------USER KESEHATAN-------------------------------------------------------------------
// Path registrasi
router.get('/registrasi_kesehatan', (req, res) => {
  res.render('../views/Kesehatan/regisKesehatan.ejs');
});
const regisKesehatan = require('../controller_kesehatan/POST_registrasi');
router.post('/registrasi_kesehatan', regisKesehatan);

// Path login
router.get('/login_kesehatan', (req, res) => {
  res.render('../views/Kesehatan/loginKesehatan.ejs');
});
const loginKesehatan = require('../controller_kesehatan/POST_login');
router.post('/login_kesehatan', loginKesehatan);

// Path home
const homeKesehatan = require('../controller_kesehatan/GET_homepage');
router.get('/home_kesehatan', cekCookie, homeKesehatan);

// Path cek NIK pasien
const cekNIK = require('../controller_kesehatan/POST_validasiNIK');
router.post('/cekNIK', cekCookie, cekNIK);

// Path input hasil
const inputHasil = require('../controller_kesehatan/POST_hasilTest');
router.post('/hasilTest/:NIK', cekCookie, inputHasil);

// Path Setting
const settingProfileKes = require('../controller_kesehatan/GET_setting');
router.get('/setting_kesehatan', cekCookie, settingProfileKes);
const postsSettingKes = require('../controller_kesehatan/POST_setting');
router.post('/setting_kesehatan', cekCookie, postsSettingKes);

// Path Logout
const logoutKesehatan = require('../controller_kesehatan/GET_logout');
router.get('/logout_kesehatan', cekCookie, logoutKesehatan);
// ----------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------USER WISATA----------------------------------------------------------------------
// Path registrasi
router.get('/registrasi_wisata', (req, res) => {
  res.render('../views/Wisata/regisWisata.ejs');
});
const regisWisata = require('../controller_wisata/POST_registrasi');
router.post('/registrasi_wisata', regisWisata);

// Path login
router.get('/login_wisata', (req, res) => {
  res.render('../views/Wisata/loginWisata.ejs');
});
const loginWisata = require('../controller_wisata/POST_login');
router.post('/login_wisata', loginWisata);

// Path home
const homeWisata = require('../controller_wisata/GET_homepage');
router.get('/home_wisata', cekCookie, homeWisata);

// Path cek
const cekData = require('../controller_wisata/POST_cekTest');
router.post('/cekTest', cekCookie, cekData);

// Path setting
const settingWisata = require('../controller_wisata/GET_setting');
router.get('/setting_wisata', cekCookie, settingWisata);
const upSetWisata = require('../controller_wisata/POST_setting');
router.post('/setting_wisata', cekCookie, upSetWisata);

// Path logout
const logoutWisata = require('../controller_wisata/GET_logout');
router.get('/logout_wisata', cekCookie, logoutWisata);
// ----------------------------------------------------------------------------------------------------------------------------------

module.exports = router;
