const firebase = require('firebase/app');
require('firebase/storage');

const firebaseConfig = {
  apiKey: 'AIzaSyCN69Fy457FrVPi_OT504SyhTHO5I9CcQI',
  authDomain: 'imagektp.firebaseapp.com',
  projectId: 'imagektp',
  storageBucket: 'imagektp.appspot.com',
  messagingSenderId: '294709261732',
  appId: '1:294709261732:web:cf4e26906a60ff8b6bbd31',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

module.exports = {
  storage,
};
