import queryGenerator from "./queryGeneratorService";
import Filter from '../entities/filterEntity';
import { QueryResult } from 'pg';
import { getDataFromColumnsPosts, getAllPostsData, getDataFromWherePosts } from '../services/postsService';
const queries = require('../database/postsQueries');

const calcMaxValue = async(num1: number, num2: number) => {
    return num1 > num2 ? num1 : num2;
}

const calcMinValue = async(num1: number, num2: number) => {
    return num1 < num2 ? num1 : num2;
}

const calcAVGValue = async(num1: number, num2: number) => {
    return num1 + num2
}

const getSingleColumn = <T>(arr: T[], columnName: keyof T) => {
    return arr.map(item => item[columnName]);
}

const getSingleColumnValues = (inputColumn: string, data: QueryResult) => {
    if (data.rowCount===null){
        throw new Error("Query is empty");
    }

    return getSingleColumn(data.rows, inputColumn);
}


const calcNumericValue = async(inputColumn: string, data: QueryResult, method: any) => {
    const columnValues: number[] = getSingleColumnValues(inputColumn, data);
    let counter: number = columnValues[0];
    
    for (let item of columnValues) {
        if (typeof item !== 'number'){
            throw new Error("To coun't min value, numeric column is needed");
        }
        counter = method(item, counter);
    }

    if ((method.name === 'calcAVGValue') && !(data.rowCount===null)) {
        return counter/=data.rowCount;
    }

    return counter;
}

const calcMedianValue = async(inputColumn: string, data: QueryResult) => {
    const columnValues: number[] = getSingleColumnValues(inputColumn, data);
    
    const sorted = columnValues.sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    let median: number = 0
    if (sorted.length % 2 === 0) {
        const median: number = (sorted[middle - 1] + sorted[middle]) / 2;
    } else {
        const median: number = sorted[middle];
    }

    return median;
}

const calcModeValue = async(inputColumn: string, data: QueryResult) => {
    const columnValues: (number|string)[] = getSingleColumnValues(inputColumn, data);
    
    let valuesEncounters = new Map<string|number, number> ();

    for (let item of columnValues) {
        valuesEncounters.set(item, (valuesEncounters.get(item) ?? 0) + 1);
    }

    let sortedValues = Array.from(valuesEncounters.entries()).sort((a, b) => b[1] - a[1]);
    
    const mode: number|string = sortedValues[0][0];
    
    return mode;
}


const calcStatistic = async(inputColumn: string[], statistic:any) => {
    getDataFromWherePosts
}