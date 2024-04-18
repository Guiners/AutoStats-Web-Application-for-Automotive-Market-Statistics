import { QueryResult } from 'pg';
const queries = require('../database/postsQueries');

const MaxValue = async(num1: number, num2: number) => {
    return num1 > num2 ? num1 : num2;
}

const MinValue = async(num1: number, num2: number) => {
    return num1 < num2 ? num1 : num2;
}

const AVGValue = async(num1: number, num2: number) => {
    return num1 + num2
}

const getSingleColumn = <T>(arr: T[], columnName: keyof T) => {
    const singleColumnWithNulls = arr.map(item => item[columnName])
    return singleColumnWithNulls.filter(item => item !== null);;
}

const getSingleColumnValues = (columnName: string, data: QueryResult) => {
    if (data.rowCount===null){
        throw new Error("Query is empty");
    }

    return getSingleColumn(data.rows, columnName);
}


const calcNumericValue = async(columnName: string, data: QueryResult, method: any) => {
    const columnValues: number[] = getSingleColumnValues(columnName, data);
    let counter: number = columnValues[0];
    
    for (let item of columnValues) {
        if (typeof item !== 'number'){
            throw new Error(`To count ${method} value, numeric column is needed`);
        }
        counter = await method(item, counter);
    }

    if ((method.name === 'AVGValue') && !(data.rowCount===null)) {
        return counter/=data.rowCount;
    }
    return counter;
}

const calcMedianValue = async(columnName: string, data: QueryResult) => {
    const columnValues: number[] = getSingleColumnValues(columnName, data);
    
    const sorted = columnValues.sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    let median: number = 0
    
    if (sorted.length % 2 === 0) {
        median = (sorted[middle - 1] + sorted[middle]) / 2;
    } else {
        median= sorted[middle];
        
    }

    return median;
}

const calcModeValue = async(columnName: string, data: QueryResult) => {
    const columnValues: number[] = getSingleColumnValues(columnName, data);
    
    let valuesEncounters = new Map<string|number, number> ();

    for (let item of columnValues) {
        valuesEncounters.set(item, (valuesEncounters.get(item) ?? 0) + 1);
    }

    let sortedValues = Array.from(valuesEncounters.entries()).sort((a, b) => b[1] - a[1]);
    
    const mode: number|string = sortedValues[0][0];
    
    return mode;
}


const calcStatistic = async(columnName: string, data: QueryResult, method:any, statistic?: string) => {
    if (statistic) {
        return await method(columnName, data, statistic);
    }
    return await method(columnName, data);
}

module.exports = {
    MaxValue, 
    MinValue, 
    AVGValue,
    calcNumericValue,
    calcMedianValue,
    calcModeValue,
    calcStatistic
}