import axios, { AxiosResponse } from 'axios';

import fsp from 'fs/promises'
import process from 'process';

const SERVER_URL = process.env.SERVER_URL

const filePath = './output.pdf'

const UPLOAD_TOKEN = process.env.UPLOAD_TOKEN;


export function sendFileToServer(id: string){
    return new Promise(async (resolve, reject)=>{
        try {

          // const fileData = fs.createReadStream(filePath);
          const fileData: Blob = new Blob([await fsp.readFile(filePath)]);
          console.log("==> ", await fsp.stat(filePath));
          const formData: FormData = new FormData();
          formData.append('file', fileData, "file.pdf");
          const response: AxiosResponse<any> = await axios.post(`${SERVER_URL}/upload/${id}`, formData, {
            headers: {
              ...formData.getHeaders,
              Authorization: `Bearer ${UPLOAD_TOKEN}`
            }
          });
          const ans = await response.data
          resolve(ans)
        } catch (error) {
          reject(error)
        }
    })
};

