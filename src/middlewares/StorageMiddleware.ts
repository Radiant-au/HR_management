import path from 'path';
import multer from 'multer';
import { Request } from 'express';

// Allowed MIME types for images and Excel files
const MIME_TYPES = {
    images: ['image/jpeg', 'image/png', 'image/gif'],
    excel: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
};

// Define the upload directory
export const UPLOADS_DIR = path.join(__dirname, '../../uploads');

// Storage configuration
export const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        // Set the same destination for both images and Excel files
        cb(null, UPLOADS_DIR);  // All files will be uploaded to the same directory
    },
    filename: (req: Request, file, cb) => {
        // Generate a unique file name based on timestamp and random number
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

// File filter to validate file types
export const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const isValidImage = MIME_TYPES.images.includes(file.mimetype);
    const isValidExcel = MIME_TYPES.excel.includes(file.mimetype);

    if (isValidImage || isValidExcel) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images and Excel files are allowed.'));
    }
};
