import pool from '../database/dbConfing'
import Filter from '../entities/filterEntity';
import { queryGenerator, transformSearchInToQuery } from "./queryGeneratorService";
import { queryFromFavourite } from "./favouriteService";

import { QueryResult } from 'pg';
import { CarData, BrandModelsGenerations } from '../entities/brandParametersEntity'
const queries = require('../database/postsQueries');


const getBrandModelsGenerations = (data: CarData[]): BrandModelsGenerations => {
    const brandModelsGenerations: BrandModelsGenerations = {};

    data.forEach(car => {
        if (!brandModelsGenerations[car.Brand]) {
            brandModelsGenerations[car.Brand] = {};
        }
        if (!brandModelsGenerations[car.Brand][car.Model]) {
            brandModelsGenerations[car.Brand][car.Model] = [];
        }
        if (car.Generation && !brandModelsGenerations[car.Brand][car.Model]?.includes(car.Generation)) {
            brandModelsGenerations[car.Brand][car.Model]?.push(car.Generation);
        } else if (!car.Generation) {
            brandModelsGenerations[car.Brand][car.Model] = null;
        }
    });

    return brandModelsGenerations;
};

const getDistinctFuelorGearBox = (data: any) => {
    const objectMap = new Map<string, string[]>;
    for (const obj of data) {
        for (const key in obj) {
            if (!objectMap.has(key)) {
                objectMap.set(key, []);
            }
            if (Array.isArray(obj[key])) {
                for (let i of obj[key]) {
                    objectMap.get(key)?.push(i);
                }
            } else {
                objectMap.get(key)?.push(obj[key]);
            }       
        }
        }
        const obj: {[key: string]: string[]} = {};
        for (const [key, value] of objectMap) {
            obj[key] = value;
        }

    return obj;
}   

const getQueryResponse = async(query: string) => {
    const client = await pool.connect();
    const queryResponse: QueryResult = await client.query(query); 

    if (queryResponse.rows.length === 0) {
        throw new Error('Query not found');
    };

    return queryResponse;
}


const getDataFromColumnsPosts = async(data: Filter) => {
    const query: string = await queryGenerator(data.inputColumns, queries.columnsPostsTable,);
    return getQueryResponse(query);
}

const getDataFromWherePosts = async(data: any) => {
    const query: string = await queryGenerator(data.inputColumns, queries.columnsPostsTable, data.inputValues);
    return getQueryResponse(query);
}

const getAllPostsData = async() => {
    return getQueryResponse(queries.getAllItem);
}

const getDistinctBrandModelGen = async() => {
    return getQueryResponse(queries.distinctBrandModelGen);
}

const getDistinctFuelType = async() => {
    return getQueryResponse(queries.distinctFuelType);
}

const getDistinctGearBox = async() => {
    return getQueryResponse(queries.distinctGearBox);
}


export {
    getDistinctFuelorGearBox,
    getBrandModelsGenerations,
    getDataFromColumnsPosts,
    getDataFromWherePosts, 
    getAllPostsData,
    getDistinctBrandModelGen,
    getDistinctFuelType,
    getDistinctGearBox
}