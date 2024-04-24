import { QueryResult } from 'pg';
import pool from '../database/dbConfing'
import { favouriteParameters } from '../entities/searchEntity'
const queriesFavourite = require('../database/favouriteQueries');


const addToQueries = (data: favouriteParameters) => {
    const dataoutput: (string|number)[] = []
    data.inputValues.forEach(element => {
        dataoutput.push(`'${element}'`);
    })

    const insertDataToQueriesTable: string = `INSERT INTO public."Queries"( "Brand", "Model", "Generation", "CapacityLow", "CapacityHigh", "HorsepowerLow", "HorsepowerHigh", "MilageLow", "MilageHigh", "Fueltype", "Gearbox", "ProductionYearLow", "ProductionYearHigh", "PriceLow", "PriceHigh", "Segment", "DriveType") VALUES (${dataoutput});`;
    
    return insertDataToQueriesTable;
}


const findId = async(data: favouriteParameters) => {
    const columns: string[] = queriesFavourite.columnsQueriesTable;
    const whereQuery: string[] = [];
    let whereParameter: string = ''

        for (let i=0; i<columns.length ; i++) {
            whereParameter = `"${columns[i]}" = '${data.inputValues[i]}'`;
            whereQuery.push(whereParameter);
        } 

        const query: string = `SELECT "Id" FROM public."Queries" WHERE ${whereQuery.join(' AND ')}`;

    const response: QueryResult = await getQueryResponse(query);

    return response;
}

const addToFavouriteQueries = async(data: favouriteParameters, id: number) => {
    const dataOutput: (string|number)[] = [`'${id}'`, `'${data.userEmail}'`, `'${data.queryName}'`]

    const query: string = `INSERT INTO public."FavouriteQueries"("QueriesFK", "UsersEmailFK", "Name") VALUES (${dataOutput});`;

    const response: QueryResult = await getQueryResponse(query);

    return response;
}

const getQueryResponse = async(query: string) => {
    const client = await pool.connect();
    const queryResponse: QueryResult = await client.query(query);
    return queryResponse;
}


const addQueryToFavourite = async (data: favouriteParameters) => {
    const query : string = await addToQueries(data);
    const result: QueryResult = await getQueryResponse(query);

    if (!(result.command === 'INSERT')) {
        throw new Error('Insert not successfull');
    }

    const queryID : QueryResult = await findId(data);
    const response = await addToFavouriteQueries(data, queryID.rows?.[0]?.Id);

    return response;
}

const removeQueryFromFavourite = async (QueriesFK: number) => {
    let query: string = queriesFavourite.deleteFromFavouriteTableByQueriesFK;
    console.log(QueriesFK)
    query += `'${QueriesFK}'`
    const response: QueryResult =  await getQueryResponse(query);
    return response;
}


export {
    addQueryToFavourite,
    removeQueryFromFavourite
}