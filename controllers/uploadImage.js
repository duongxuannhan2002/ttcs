import multer from 'multer';
import fs from 'fs';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCtrvePxFZdwBYz3OkJ7Wi16ts4ms0X2xE",
  authDomain: "tra-guitar.firebaseapp.com",
  projectId: "tra-guitar",
  storageBucket: "tra-guitar.appspot.com",
  messagingSenderId: "131696310005",
  appId: "1:131696310005:web:4f5be5d738ebca1f40f7bc",
  measurementId: "G-NY0YY9TJV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const storage = getStorage();

// Khởi tạo Multer để xử lý việc tải lên file
const upload = multer({ dest: 'uploads/' });

// Hàm upload ảnh lên Firebase Storage
async function uploadImageFireBase(req, res) {
  try {
    console.log('hello from uploadImage')
    const file = req.file; // Tệp ảnh được tải lên từ Multer
    if (!file) {
      return res.status(400).send('Không có tệp ảnh được tải lên.');
    }
    console.log('b')
    const bucket = storage().bucket();
    const remoteFileName = `images/${file.originalname}`;

    const uploadedFile = await bucket.upload(file.path, {
      destination: remoteFileName,
      metadata: {
        contentType: file.mimetype
      }
    });

    fs.unlinkSync(file.path);

    const downloadUrl = uploadedFile && uploadedFile[0] && uploadedFile[0].metadata && uploadedFile[0].metadata.mediaLink;
    console.log(downloadUrl, 'a')
    res.status(200).json({ downloadUrl });
  } catch (error) {
    console.error('Lỗi upload:', error);
    res.status(500).send('Có lỗi khi upload ảnh.');
  }
}

export default uploadImageFireBase;
