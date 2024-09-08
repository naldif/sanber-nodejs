import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB limit
  },
});

export const single = upload.single("file"); // Field name must match the client's request
export const multiple = upload.array("files", 10); // Field name must match the client's request

export default {
  single,
  multiple,
};
