import {Request, Response,NextFunction} from 'express'
import { HttpStatus } from '../utils/httpStatusCode';

export const errorHandles = (err:any,req:Request,res:Response,next:NextFunction)=>{
    let errorMessage = err?.message || 'An unexpected error';
    res.status(HttpStatus.NOT_FOUND).send({errorMessage,success:false})
}

