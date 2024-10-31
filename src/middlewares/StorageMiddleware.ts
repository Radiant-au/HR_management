import path from "path";
import multer from "multer";


export const storage = multer .diskStorage({ 
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../../uploads")); // Adjust path as needed
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + "-" + file.originalname); // Unique file names
    }

});