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
        
        const infos = await ytdl.getInfo(req.body.url);
        res.status(200).json(infos);
    } catch (error) {
        next(error)
    }
})

export default router