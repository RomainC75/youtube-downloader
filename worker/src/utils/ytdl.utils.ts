import ytdl from 'ytdl-core';
import * as fs from 'fs';
import amqp from 'amqplib/callback_api';

export async function getYtvideo (id: string, link: string, channel: amqp.Channel ): Promise<void>{
    return new Promise ( async (resolve, reject)=>{
        const outputFilePath = `./data/${id}.mp3`;
        console.log("=> ", outputFilePath)

        const infos = await ytdl.getBasicInfo(link)
        // console.log('==> infos : ', infos)
        const download = ytdl(link, { filter: 'audioonly', quality: 'highest' });

        download.on('progress', (_, downloaded: number, total: number) => {
            const percent = (downloaded / total) * 100;
            // console.log(`Downloaded: ${percent.toFixed(2)}%`);
            channel.publish('downloadProgress', '', Buffer.from(JSON.stringify({id,percent})));
        });
        download.on('end', () => {
            console.log('Download completed!');
            resolve();
        });
        download.on('error', (error: {message: string}) => {
            console.error('Error:', error.message);
            reject();
        });
        download.pipe(fs.createWriteStream(outputFilePath));
    })
}
