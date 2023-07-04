import { IsEnum, IsNotEmpty, IsString, IsUrl } from "class-validator";
import 'reflect-metadata'; 

enum VideoFormats{
    video = "video",
    audio = "audio"
}

export class DownloadVideoDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsEnum(VideoFormats)
  format: VideoFormats;

  constructor(){
    this.url=''
    this.format=VideoFormats.video;
  }

}
