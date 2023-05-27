import path from 'path';
import multer, { FileFilterCallback } from "multer";
import config from './appConfig';

function checkFileType(file: any, callBack: any) {
  const fileTypes = /csv/;
  const fileExtName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (fileExtName && mimetype) {
    return callBack(null, true);
  } else {
    callBack("Only csv file type is allowed!")
  };
};

// Multer storage configuration
// Store the uploaded file in memory
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: config.MaxFileSize },
  fileFilter: function (req: any, file: any, callBack: FileFilterCallback) {
    checkFileType(file, callBack);
  }
}).single("file");
