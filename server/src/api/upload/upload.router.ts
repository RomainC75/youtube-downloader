import { Router } from 'express';
// import { isAuthorizedToUpload } from "../../middleware/isAuthorizedToUpload.mid";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  // destination: 'uploads/',
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(
      "==> file received : ",
      file.originalname
    );
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/:id",
  // isAuthorizedToUpload,
  upload.single("file"),
  async (req, res, next) => {
    try {
      // const ans = await Invoice.findByIdAndUpdate(
      //   req.params.id,
      //   {
      //     isDone: true,
      //   },
      //   { new: true }
      // );
      // console.log("=>", req.params.id, req.headers, ans);
      res.status(201).send("File uploaded successfully.");
    } catch (error) {
      console.log("UPLOAD ==> error ")
      next(error);
    }
  }
);

export default router;