import amqp, {Connection} from 'amqplib/callback_api';

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

    connection.createChannel((errorChannel, channel) => {
      if (errorChannel) {
        console.log('Error creating channel: ', errorChannel)
        return
      }

      ch = channel
      channel.assertQueue('downloadQueue', {
        durable: true
      });
      console.log('Connected to RabbitMQ')
    })
  })

export async function publishToQueue (queueName: TQueueName, url, id){
    if(!ch){
        return;
    }
    const val = JSON.stringify({url,id})
    console.log("'= val ", val)
    return ch.sendToQueue(queueName, Buffer.from(val))
}

