/* Core */
import path from 'path';

/* Libraries */
import { Request } from 'express';
import multer, { FileFilterCallback } from "multer";

/* Application Modules */
import config from '../../config/appConfig';

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
export const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: config.MAX_FILE_SIZE },
  fileFilter: function (req: Request, file: Express.Multer.File, callBack: FileFilterCallback) {
    checkFileType(file, callBack);
  }
}).single("file");
