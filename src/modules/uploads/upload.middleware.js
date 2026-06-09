import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "incident-management",
    resource_type: "auto",
  }),
});

const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf",
  "text/plain",
];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload;
