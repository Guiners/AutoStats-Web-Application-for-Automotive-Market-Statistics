import { Request, Response } from 'express';
import { addQueryToFavourite, removeQueryFromFavourite } from '../services/favouriteService';

const addToFavourite = async (req: Request, res: Response) => {
    try {
        const response = await addQueryToFavourite(req.body);
        res.status(200).json({ "message": response.command });
    } catch (error) {
        return res.status(401).json({ "message": `${error}`});
    }
}

const removeFromFavourite = async (req: Request, res: Response) => {
    try {
        const response = await removeQueryFromFavourite(req.body.Id);
        res.status(200).json({ "message": response.command });
    } catch (error) {
        return res.status(401).json({ "message": `${error}`});
    }
}


module.exports = { addToFavourite, removeFromFavourite };