import axios, { AxiosResponse } from "axios";

import fsp from "fs/promises";
import process from "process";

const SERVER_URL = process.env.SERVER_URL;

const UPLOAD_TOKEN = process.env.UPLOAD_TOKEN;

export function sendFileToServer(id: string, format: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const filePath = `./data/${id}.mp3`
      console.log("=> upload from : ", filePath)
      // const fileData = fs.createReadStream(filePath);
      const fileData: Blob = new Blob([await fsp.readFile(filePath)]);
      console.log("==> ", await fsp.stat(filePath));
      const formData = new FormData()
      const name = `${id}.${format==='video' ? 'avi' : 'mp3'}`
      formData.append("file", fileData, name);
      
      const response: AxiosResponse<any> = await axios.post(
        `${SERVER_URL}/api/upload/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${UPLOAD_TOKEN}`,

          }
        }
      );
      const ans = await response.data;
      console.log("===> upload ans : ", ans)
      // await new Promise((resolve)=>{setTimeout(()=>{resolve(true)},4000)})
      resolve(ans);
      
      // reject()
    } catch (error) {
      reject(error);
    }
  });
}
