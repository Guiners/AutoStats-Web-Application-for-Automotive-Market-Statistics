import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { getDataFromColumnsPosts, getAllPostsData, getDataFromWherePosts } from '../services/postsService';


const getHandler = async (req: Request, res: Response, func: any, passBody: boolean) => {
    try {
        if (passBody){
            const result: QueryResult = await func(req.body);
            res.status(200).json({ rows: result.rows });

        } else {

            const result: QueryResult = await func();
            res.status(200).json({ rows: result.rows });
        } 

    } catch (error) {
        return res.status(401).json({ "messagse": `${error}`});
    }
}

const getFilteredColumnsPosts = async (req: Request, res: Response) => {
    await getHandler(req, res, getDataFromColumnsPosts, true)
}

const getDataWherePosts = async (req: Request, res: Response) => {
    await getHandler(req, res, getDataFromWherePosts, true)
}

const getAllPosts = async (req: Request, res: Response) => {
    await getHandler(req, res, getAllPostsData, false)
}

module.exports = { getFilteredColumnsPosts, getAllPosts, getDataWherePosts };