import multer from 'multer'

const storage = multer.diskStorage({
    // destination: 'uploads/',
    destination: (req, file, callback) => {
      callback(null, 'uploads');
    },
    filename: (req, file, cb) => {
      console.log("==> file received : ", req.params.id+'-'+file.originalname)
      cb(null, req.params.id+'-'+file.originalname);
    }
  });
export default multer({ storage });