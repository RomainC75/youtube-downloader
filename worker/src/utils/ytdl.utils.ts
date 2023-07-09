import ytdl from 'ytdl-core';
import * as fs from 'fs';
import amqp from 'amqplib/callback_api';

interface IgetYtvideo {
    filePath: string
}

export async function getYtvideo (id: string, link: string, format: string, channel: amqp.Channel ): Promise<IgetYtvideo>{
    return new Promise ( async (resolve, reject)=>{
        const outputFilePath = `./data/${id}.mp3`;
        console.log("=> ", outputFilePath)
        const formatFilter = format === 'video' ? 'videoandaudio' : 'audioonly'
        // const infos = await ytdl.getBasicInfo(link)
        // console.log('==> infos : ', infos)
        const download = ytdl(link, { filter: formatFilter, quality: 'highest' });

        download.on('progress', (_, downloaded: number, total: number) => {
            const percent = (downloaded / total) * 100;
            // console.log(`Downloaded: ${percent.toFixed(2)}%`);
            channel.publish('downloadProgress', '', Buffer.from(JSON.stringify({id,percent})));
        });
        download.on('end', () => {
            console.log('Download completed!');
            resolve({filePath: outputFilePath});
        });
        download.on('error', (error: {message: string}) => {
            console.error('Error:', error.message);
            reject({filePath: outputFilePath});
        });
        download.pipe(fs.createWriteStream(outputFilePath));
    })
}

export async function fakeGetYtvideo (id: string, link: string, format: string, channel: amqp.Channel ): Promise<IgetYtvideo>{
    let i=0
    return new Promise(async (resolve, reject)=>{
        try {
            channel.assertExchange(id, 'fanout', {
                durable: false
              });
            console.log("==> beginning")
            const intervaleId = setInterval(()=>{
                if(i>1000){
                    clearInterval(intervaleId)
                    resolve({filePath: "fake"})
                }
                console.log("=> ", i, "===",id, link, format)
                channel.publish(id, '', Buffer.from(JSON.stringify({id,percent: i})));
                i++
            },1000)
        } catch (error) {
            reject()
        }
    })
}
