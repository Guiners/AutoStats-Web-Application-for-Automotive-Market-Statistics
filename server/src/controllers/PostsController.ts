import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { getFilteredPostsData, getAllPostsData } from '../services/postsService';


const getFilteredPosts = async (req: Request, res: Response) => {
    try {
        const result: QueryResult = await getFilteredPostsData(req.body);
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
module.exports = { getFilteredPosts, getAllPosts };