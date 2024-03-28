import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const BlacklistedTokenDB = require('../model/blackListedTokens');
const dotenv = require('dotenv');
dotenv.config();

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '') ?? 
        req.body.headers.Authorization.replace('Bearer ', '');
    
        if (!token) {
            throw new Error();
        } 

        const blackListedToken = await BlacklistedTokenDB.findOne({token: token});
        if (blackListedToken) {
            throw new Error('Token not atuhorized')
        }
        
        const decoded = jwt.verify(token, dotenv.JWTKEY);
        (req as CustomRequest).token = decoded;

        next();
    } catch (err) {
   res.status(401).send('Please authenticate');
 }
};

module.exports = { auth };