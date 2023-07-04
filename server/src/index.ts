import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import upload from "./utils/multer.utils";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "./errors";
import apiRouter from './api/index'

const PORT = 3000;

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static('public'));

// app.use('/upload',upload.single('file'), async (req, res, next)=>{
//     try {

//     } catch (error) {
//         next(error)
//     }
// });

app.use('/api', apiRouter)

errorHandler(app)

app.listen(PORT, () => {
  console.log("==> Server run on port : ", PORT);
});
