const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadFile = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "DisplayPictures",
    });
    fs.unlinkSync(filePath);
    return result;
  } catch (err) {
    console.log(err.message);
  }
};

const deleteFile = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { uploadFile, deleteFile };
