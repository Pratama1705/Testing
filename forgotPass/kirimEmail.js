const transporter = require('./transport');

const verifEmail = (email) => {
  const mailOptions = {
    from: 'Lupa Password <waptridcenter@gmail.com>',
    to: email,
    subject: 'Ini Password Kamu Loh!',
    html: `Hayo!, password kamu sekarang telah di reset menjadi "lupaPassword". Mohon diubah kembali passwordnya di menu setting dan disimpan serta diingat dengan baik ya!`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return err;
    }
  });
  return 'Email telah dikirim';
};

module.exports = verifEmail;
