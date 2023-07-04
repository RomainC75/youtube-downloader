import { Router, Request, Response, NextFunction } from 'express'
import ytdl from 'ytdl-core';
import { GetVideoDto } from '../../dtos/getVideo.dto';
import { validate } from 'class-validator';

const router = Router()

router.get('/', ( req: Request, res: Response, next: NextFunction )=>{
    try {
        
    } catch (error) {
        next(error)
    }
})

router.get('/infos', async( req: Request, res: Response, next: NextFunction )=>{
    try {
        const getVideoDto = new GetVideoDto();
        getVideoDto.url = req.body.url;

        const errors = await validate(getVideoDto);
        if (errors.length>0){
            next(errors); return;
        }
        
        const infos = await ytdl.getBasicInfo(req.body.url);
        res.status(200).json(infos.player_response.streamingData.formats[0]);

    } catch (error){ 
        next(error);
    }
})

router.get('/download', async( req: Request, res: Response, next: NextFunction )=>{
    try {
        // const ans = await Video.create({url:req.body.url})
        // publishToQueue('ytDownload', req.body.url, ans._id.toString())
        res.status(200).json({
            message : 'done'
        })
    } catch (error) {
        console.log("=> error ")
        next(error)
    }
})

export default router