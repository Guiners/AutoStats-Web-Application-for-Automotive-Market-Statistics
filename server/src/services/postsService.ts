import pool from '../database/dbConfing'
import Filter from '../entities/filterEntity';
import queryGenerator from "./queryGeneratorService";
import { QueryResult } from 'pg';
const queries = require('../database/postsQueries');


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


const getDataFromWherePosts = async(data: Filter) => {
    const query: string = await queryGenerator(data.inputColumns, queries.columnsPostsTable, data.inputValues);
    return getQueryResponse(query);
}


const getAllPostsData = async() => {
    return getQueryResponse(queries.getAllItem);
}


export {
    getDataFromColumnsPosts,
    getDataFromWherePosts, 
    getAllPostsData
}