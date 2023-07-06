// import amqp from ('amqplib/callback_api')

// const HOSTNAME = process.env.RABBIT_HOSTNAME
// const RABBIT_USERNAME = process.env.RABBIT_USERNAME
// const RABBIT_PASSWORD = process.env.RABBIT_PASSWORD
// const RABBIT_FULL_URL = `amqp://${RABBIT_USERNAME}:${RABBIT_PASSWORD}@${HOSTNAME}`

// export async function connectToPubSubChannel = () =>{

// }
// amqp.connect(RABBIT_FULL_URL, function(error0, connection) {
//   if (error0) {
//     throw error0;
//   }
//   connection.createChannel(function(error1, channel) {
//     if (error1) {
//       throw error1;
//     }
//     var exchange = 'logs';

//     channel.assertExchange(exchange, 'fanout', {
//       durable: false
//     });

//     channel.assertQueue('', {
//       exclusive: true
//     }, function(error2, q) {
//       if (error2) {
//         throw error2;
//       }
//       console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
//       channel.bindQueue(q.queue, exchange, '');

//       channel.consume(q.queue, function(msg) {
//         if(msg.content) {
//             console.log(" [x] %s", msg.content.toString());
//           }
//       }, {
//         noAck: true
//       });
//     });
//   });
// });



// export 