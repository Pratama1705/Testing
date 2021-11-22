const cekToken = async (req, res, next) => {
  const authToken = await req.cookies['jwt'];
  req.user = authToken;
  next();
};

module.exports = cekToken;
