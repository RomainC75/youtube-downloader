import { Request, Response, NextFunction } from "express";
const UPLOAD_TOKEN = process.env.UPLOAD_TOKEN;

export async function isAuthorizedToUpload( req: Request, _: Response, next: NextFunction ){
    const splitHeader = req.headers.authorization ? req.headers.authorization.split(' '): '';
    if( splitHeader.length !== 2 || splitHeader[1] !== UPLOAD_TOKEN ){
        next({message: "not Authorized to upload"});
    }
    next();
}