import amqp from 'amqplib/callback_api';
import fsp from 'fs/promises';

import { fakeGetYtvideo, getYtvideo } from "./utils/ytdl.utils";
import { sendFileToServer } from './utils/file.utils';

const RABBIT_HOSTNAME = process.env.RABBIT_HOSTNAME;
const RABBIT_USERNAME = process.env.RABBIT_USERNAME;
const RABBIT_PASSWORD = process.env.RABBIT_PASSWORD;

const FULL_URL = `amqp://${RABBIT_USERNAME}:${RABBIT_PASSWORD}@${RABBIT_HOSTNAME}`;

// getYtvideo('mlkj', 'https://www.youtube.com/watch?v=RIxlGbqc2RY');

amqp.connect(FULL_URL, function(error0, connection) {
    if (error0) {
        console.log("=> error0", error0)
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            console.log("=> error1", error1)
            throw error1;
        }
        const queue = 'downloadQueue';
        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1)

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, async function(msg: amqp.Message | null) {
            if(!msg){
                return;
            }
            console.log(" [x] Received %s", msg.content.toString() );
            if(Math.random()<0.5){
                try {
                    console.log( "==> content : ", JSON.parse(msg.content.toString()) );
                    const {url, id, format} = JSON.parse( msg.content.toString() );
                    console.log("======================")
                    console.log("==> ", url, id, format)

                    const {filePath} = await fakeGetYtvideo(id, url, format, channel);
                    
                    await sendFileToServer(id, format)
                    // console.log("==> DONE !!!!!!!!!!!", ans);
                    await fsp.unlink(filePath)
                    channel.ack(msg);
                } catch (error) {
                    console.log("==> error :::: ", error);
                    channel.reject(msg, true);
                }
            }else{
                console.log(" xx REJECTED xx : ", msg.content.toString())
                channel.reject(msg, true)
            }
        }, {
            noAck: false
        });
    });
}) 