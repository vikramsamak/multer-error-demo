import express from "express";
import multer from "multer";
import path from "path";
import multerErrorHandler from "./multerErrorHandler.js";

const app = express();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      cb(
        null,
        file.originalname.replace(extension, "") + "-" + Date.now() + extension
      );
    },
  }),
});

app.post(
  "/upload",
  upload.fields([{ name: "file", maxCount: 1 }]),
  multerErrorHandler,
  (req, res) => {
    res.json({
      message: "File uploaded successfully",
      files: req.files,
    });
  }
);

app.use((err, req, res, next) => {
  if (err) res.status(500).json({ error: err.message });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
