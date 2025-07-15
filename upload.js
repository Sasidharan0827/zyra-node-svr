import multer from "multer";
const storage = multer.diskStorage({
  destination: "uploads/", // save locally first
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
export default upload;
