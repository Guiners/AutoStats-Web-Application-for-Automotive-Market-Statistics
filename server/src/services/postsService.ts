import pool from '../database/dbConfing'
import Filter from '../entities/filterEntity';
import queryGenerator from "./queryGeneratorService";
import { QueryResult } from 'pg';
const queries = require('../database/postsQueries');
const dotenv = require('dotenv');
dotenv.config();

const getDataFromColumnsPosts = async(data: Filter) => {
    const client = await pool.connect();
    
    const query: string = await queryGenerator(data.inputColumns, queries.columnsPostsTable,);
    
    const queryResponse: QueryResult = await client.query(query); 

    if (queryResponse.rows.length === 0) {
        throw new Error('Query not found');
    };

    return queryResponse;
}

const getDataFromWherePosts = async(data: Filter) => {
    const client = await pool.connect();
    
    const query: string = await queryGenerator(data.inputColumns, queries.columnsPostsTable, data.inputValues);
    
    const queryResponse: QueryResult = await client.query(query); 

    if (queryResponse.rows.length === 0) {
        throw new Error('Query not found');
    };

    return queryResponse;
}

const getAllPostsData = async() => {
    const client = await pool.connect();
    
    const queryResponse: QueryResult = await client.query(queries.getAllItem); 

    if (queryResponse.rows.length === 0) {
        throw new Error('Query not found');
    };

    return queryResponse;
}
export {
    getDataFromColumnsPosts,
    getDataFromWherePosts, 
    getAllPostsData
}