import multer from "multer";

// Multer storage configuration
const storage = multer.memoryStorage();
export const upload = multer({ storage });