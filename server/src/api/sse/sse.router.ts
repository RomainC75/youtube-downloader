import { consumeExchange } from '../..//db/rabbitMq/index.db';
import { Router, Request, Response, NextFunction } from 'express';


const router = Router()

let dataSource = 0;
const updateDataSource = () => {
  const delta = Math.random();
  dataSource += delta;
}


router.get('/:id', async(req: Request, res: Response, next: NextFunction) =>{
    try {
        const {id} = req.params
        res.statusCode = 200;
        // !!IMPORTANT LINE
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("connection", "keep-alive");
        res.setHeader("Content-Type", "text/event-stream");

        // setInterval(() => {
        //     updateDataSource()
        //     const data = JSON.stringify({ ticker: dataSource });
        //     console.log("=> data : ", data)
        //     res.write(`id: ${(new Date()).toLocaleTimeString()}\ndata: ${data}\n\n`);
        // }, 1000);

        consumeExchange('downloadProgress', id, res)

    } catch (error) {
        
    }
})


export default router