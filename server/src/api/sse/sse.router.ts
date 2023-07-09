import { consumeExchange, getChannel } from '../../db/rabbitMq/index.db';
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
        console.log("==> id : ", id)
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

        const ch = await getChannel()
        // console.log("==> CH  : ", ch)
        // ch.consume(id, (message) =>{
        //   if(message){
        //     console.log('==> ', JSON.parse(message.content.toString()))
        //     // const data = JSON.parse(message.content.toString())
        //     const strData = message.content.toString()
        //     res.write(`id: ${(new Date()).toLocaleTimeString()}\ndata: ${strData}\n\n`);
        //   }
        // })

        ch.assertExchange(id, 'fanout', {
          durable: false
        });
    
        ch.assertQueue('', {
          exclusive: true
        }, function(error2, q) {
          console.log("===> q : ", q)
          if (error2) {
            throw error2;
          }
          console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", id);
          ch.bindQueue(q.queue, id, '');
          console.log("==++++++++++")
          ch.consume(q.queue, function(msg) {
            console.log("===> CONSUME")
            if(msg) {
                console.log(" [x] %s", msg.content.toString());
                const strData = msg.content.toString()
                console.log("==> DATA ", strData)
                res.write(`id: ${(new Date()).toLocaleTimeString()}\ndata: ${strData}\n\n`);
              }
          }, {
            noAck: true
          });
        });




        // consumeExchange('downloadProgress', id, res)

    } catch (error) {
        console.log("==< ERROR : ", error)
        next(error)
    }
})


export default router