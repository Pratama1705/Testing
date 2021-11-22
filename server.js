const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
require('dotenv').config();

// Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Setting ejs as a view engine and css
app.set('view engine', 'ejs');
app.use(express.static('./views/public_css'));

// Connection to MongoDB
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: false,
  })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(`DB Connection Error : ${err.message}`));

// Router
const allRoutes = require('./routes/allRoutes');
app.use('', allRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
