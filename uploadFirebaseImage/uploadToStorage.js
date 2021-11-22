const { storage } = require('./firebase');

const uploadImage = (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!file) {
        // reject(new Error('No Image File'));
        resolve('Image Must Be Fill!');
      }

      const metadata = {
        contentType: file.mimetype,
      };

      const storageRef = storage.ref();
      const imageRef = storageRef.child(`images/${+Date.now()}-${file.originalname}`);
      const snapshot = await imageRef.put(file.buffer, metadata);

      const url = await snapshot.ref.getDownloadURL();

      resolve(url);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  uploadImage,
};
