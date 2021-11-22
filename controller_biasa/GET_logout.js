const logout = async (req, res) => {
  cookie = req.cookies;
  for (var prop in cookie) {
    if (!cookie.hasOwnProperty(prop)) {
      continue;
    }
    res.cookie(prop, '', { expires: new Date(0) });
    console.log('User Logged Out');
  }
  res.redirect('/login_biasa');
};

module.exports = logout;
