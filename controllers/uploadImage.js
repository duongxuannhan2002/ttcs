import { getStorage } from 'firebase/storage';
import fs from 'fs';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../config/firebase.js';

export default async function uploadImageFireBase(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('Không có tệp ảnh được tải lên.');
    }

    const ext = file.originalname.split('.').pop();
    const newFilename = Date.now() + '.' + ext;
    const fileData = fs.readFileSync(file.path);
    const storage = getStorage();
    const storageRef = ref(storage, `images/${newFilename}`);
    const uploadTask = uploadBytesResumable(storageRef, fileData);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
      },
      (error) => {
        reject(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          resolve(url);
        }).catch((error) => {
          reject(error.message);
        });
      }
    );
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    
      console.log('Tệp đã được xóa thành công');
    });
  });
}

export const config = {
  api: { bodyParser: false },
};