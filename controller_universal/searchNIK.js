const Warga = require('../models/Biasa/loginRegisBiasa');
// const Hasil_Test = require('../models/Kesehatan/hasilTest');

const searchData = async (req, res) => {
  let { payload } = req.body;

  // Find in DB
  const regex = new RegExp(payload, 'i');
  let search = await Warga.find({ NIK: { $regex: regex } }).exec();

  // Limit search results to 10
  search = search.slice(0, 10);

  res.send({
    payload: search,
  });
};

module.exports = searchData;
