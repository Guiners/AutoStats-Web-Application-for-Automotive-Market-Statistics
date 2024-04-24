import { Request, Response } from 'express';
import { queryFromFavourite, usersFavouriteQueriesIds, addQueryToFavourite, removeQueryFromFavourite } from '../services/favouriteService';

import { transformSearchInToQuery } from '../services/queryGeneratorService'
import { getDataFromWherePosts } from '../services/postsService'

import { searchParameters } from '../entities/searchEntity'


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

const getUsersFavouriteQueriesIds = async (req: Request, res: Response) => {
    try {
        const response = await usersFavouriteQueriesIds(req.body.userEmail);
        res.status(200).json({ "message": response });
    } catch (error) {
        return res.status(401).json({ "message": `${error}`});
    }
}

const getQueryFromFavouriteById = async (req: Request, res: Response) => {
    try {
        const response = await queryFromFavourite(req.body.Id);
        const data = await transformSearchInToQuery(response.rows);
        const result = await getDataFromWherePosts(data);
        res.status(200).json({ "message": result.rows });

    } catch (error) {
        return res.status(401).json({ "message": `${error}`});
    }
}



module.exports = { addToFavourite, removeFromFavourite, getUsersFavouriteQueriesIds, getQueryFromFavouriteById };