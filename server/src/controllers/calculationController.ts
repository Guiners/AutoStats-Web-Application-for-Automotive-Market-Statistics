import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { getDataFromWherePosts } from '../services/postsService';
const calculationServices = require("../services/calculationServices");

const calcHandeler = async (req: Request, res: Response, func: any, arg1?: any) => {
    try {
        const data: QueryResult = await getDataFromWherePosts(req.body);
        const result: number = calculationServices.calcStatistic(req.body.columnToCount, data, func, arg1);
        res.status(200).json({result});

    } catch (error) {
        return res.status(401).json({ "messagse": `${error}`});
    }
}


const calcMin = async (req: Request, res: Response) => {
    return calcHandeler(req, res, calculationServices.calcNumericValue, calculationServices.MinValue);
}

const calcMax = async (req: Request, res: Response) => {
    return calcHandeler(req, res, calculationServices.calcNumericValue, calculationServices.MaxValue);
}

const calcAVG = async (req: Request, res: Response) => {
    return calcHandeler(req, res, calculationServices.calcNumericValue, calculationServices.AVGValue);
}

const calcMedian = async (req: Request, res: Response) => {
    return calcHandeler(req, res, calculationServices.calcMedianValue);
}

const calcMode = async (req: Request, res: Response) => {
    return calcHandeler(req, res, calculationServices.calcModeValue);
}

module.exports = {
    calcMin,
    calcMax,
    calcAVG,
    calcMedian,
    calcMode
}