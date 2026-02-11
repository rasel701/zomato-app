const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUbLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadVideoFile = async (file, fileName) => {
  const response = await client.files.upload({
    file: file,
    fileName: fileName,
  });
  return response;
};

module.exports = {
  uploadVideoFile,
};
