import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { getDataFromColumnsPosts, getAllPostsData, getDataFromWherePosts } from '../services/postsService';


const getFilteredColumnsPosts = async (req: Request, res: Response) => {
    try {
        const result: QueryResult = await getDataFromColumnsPosts(req.body);
        res.status(200).json({ result });

    } catch (error) {
        return res.status(401).json({ "messagse": `${error}`});
    }
}


const getDataWherePosts = async (req: Request, res: Response) => {
    try {
        const result: QueryResult = await getDataFromWherePosts(req.body);
        res.status(200).json({ result });

    } catch (error) {
        return res.status(401).json({ "messagse": `${error}`});
    }
}

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const result: QueryResult = await getAllPostsData();
        res.status(200).json({ result });

    } catch (error) {
        return res.status(401).json({ "messagse": `${error}`});
    }
}
module.exports = { getFilteredColumnsPosts, getAllPosts, getDataWherePosts };