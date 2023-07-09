import amqp, {Connection} from 'amqplib/callback_api';
import { Response } from 'express';
const HOSTNAME = process.env.RABBIT_HOSTNAME
const RABBIT_USERNAME = process.env.RABBIT_USERNAME
const RABBIT_PASSWORD = process.env.RABBIT_PASSWORD
const RABBIT_FULL_URL = `amqp://${RABBIT_USERNAME}:${RABBIT_PASSWORD}@${HOSTNAME}`

console.log("==> rabbitmq name : ", HOSTNAME)
console.log("==> rabbitmq name : ", RABBIT_FULL_URL)

type TQueueName = 'downloadQueue' | 'other'

let ch: null | amqp.Channel = null

amqp.connect(RABBIT_FULL_URL, (errorConnect: Error, connection: Connection) => {
    if (errorConnect) {
      console.log('Error connecting to RabbitMQ: ', errorConnect)
      return
    }

    connection.createChannel(async (errorChannel, channel) => {
      if (errorChannel) {
        console.log('Error creating channel: ', errorChannel)
        return
      }

      ch = channel

      // queue
      channel.assertQueue('downloadQueue', {
        durable: true
      });

      // pub/sub
      channel.assertExchange('downloadProgress', 'fanout', {
      durable: false
    });
    //   channel.consume(
    //   'downloadProgress',
    //   (message) => {
    //     if (message) {
    //       console.log(
    //         " [x] Received '%s'",
    //         JSON.parse(message.content.toString())
    //       );
    //     }
    //   },
    //   { noAck: true }
    // );
      console.log('Connected to RabbitMQ')
    })
  })

export async function publishToQueue (queueName: TQueueName, url: string, id: string, format: string){
    if(!ch){
        return;
    }
    const val = JSON.stringify({url,id, format})
    console.log("'= val ", val)
    return ch.sendToQueue(queueName, Buffer.from(val))
}

export async function consumeExchange(exchangeName: string, id: string, res: Response){
  console.log("=> id ", id)
  if(!ch){
    return 
  }
  ch.consume(
    exchangeName,
    (message) => {
      if (message) {
        console.log('==> ', JSON.parse(message.content.toString()))
        // const data = JSON.parse(message.content.toString())
        const strData = message.content.toString()
        res.write(`id: ${(new Date()).toLocaleTimeString()}\ndata: ${strData}\n\n`);
      }
    },
    { noAck: true }
  );
}


