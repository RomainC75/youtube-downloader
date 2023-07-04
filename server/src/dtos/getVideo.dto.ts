import { IsNotEmpty, IsUrl } from "class-validator";
import 'reflect-metadata'; 

export class GetVideoDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  constructor(){
    this.url=''
  }

}
