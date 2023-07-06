import { Router, Request, Response, NextFunction } from 'express';
import 

const router = Router()

let dataSource = 0;
const updateDataSource = () => {
  const delta = Math.random();
  dataSource += delta;
}


router.get('/:id', async(req: Request, res: Response, next: NextFunction) =>{
    try {
        res.statusCode = 200;
        // !!IMPORTANT LINE
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("connection", "keep-alive");
        res.setHeader("Content-Type", "text/event-stream");

        setInterval(() => {
            updateDataSource()
            const data = JSON.stringify({ ticker: dataSource });
            res.write(`id: ${(new Date()).toLocaleTimeString()}\ndata: ${data}\n\n`);
        }, 1000);
    } catch (error) {
        
    }
})


export default router