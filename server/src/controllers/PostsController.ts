import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { getDistinctFuelorGearBox, getDataFromColumnsPosts, getAllPostsData, getDataFromWherePosts, getDistinctBrandModelGen, getBrandModelsGenerations, getDistinctFuelType, getDistinctGearBox  } from '../services/postsService';
import { CarData, BrandModelsGenerations } from '../entities/brandParametersEntity'



const getDistrictHandler = async(req: Request, res: Response, func: any, label: string) => {
    try {
        const result: QueryResult = await func();
        if (label === 'Marka'){
            const brands = await getBrandModelsGenerations(result.rows)
            res.status(200).json({ rows: brands, label: label });
        } else {
            const objectMap = await getDistinctFuelorGearBox(result.rows);
            res.status(200).json({ rows: objectMap, label: label });
        }
    } catch (error) {
        return res.status(401).json({ "messagse": `${error}`});
    }
}

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

const getBrandModelGen = async (req: Request, res: Response) => {
    await getDistrictHandler(req, res, getDistinctBrandModelGen, 'Marka')
}

const getFuelType = async (req: Request, res: Response) => {
    await getDistrictHandler(req, res, getDistinctFuelType, 'Paliwo')
}

const getGearBox = async (req: Request, res: Response) => {
    await getDistrictHandler(req, res, getDistinctGearBox, 'Skrzynia Biegow')
}


module.exports = { getFilteredColumnsPosts, getAllPosts, getDataWherePosts, getBrandModelGen, getFuelType, getGearBox};