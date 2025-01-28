import multer from "multer";

const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const errorMessages = {
      LIMIT_PART_COUNT: "Too many parts",
      LIMIT_FILE_SIZE: "File too large",
      LIMIT_FILE_COUNT: "Too many files",
      LIMIT_FIELD_KEY: "Field name too long",
      LIMIT_FIELD_VALUE: "Field value too long",
      LIMIT_FIELD_COUNT: "Too many fields",
      LIMIT_UNEXPECTED_FILE: "Unexpected field",
      MISSING_FIELD_NAME: "Field name missing",
    };

    const message = errorMessages[err.code] || err.message;

    return res.status(400).json({ error: message });
  }

  next(err);
};

export default multerErrorHandler;
