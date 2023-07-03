import express from 'express'
import bodyParser from 'body-parser'
import upload from './utils/multer.utils'
import cors from 'cors'
import { errorHandler } from './errors'

const PORT = 3000

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(upload.single('file'), async (req, res, next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
});

app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log("==> Server run on port : ",  PORT)
});