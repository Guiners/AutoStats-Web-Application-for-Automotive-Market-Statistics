
const queryGenerator = async(inputColumns: string[], tableColumns: string[], inputValues?: (string|number|number[])[]) => {
    
    await addDoubleQuotes(inputColumns);
    await addDoubleQuotes(tableColumns);
    await checkIfColumnInTable(inputColumns, tableColumns);

    let query: string = ""
    if (!inputValues) {
        query = `SELECT ${inputColumns} FROM public."Posts" LIMIT 20`;
    
    } else {

        await addSingleQuotes(inputValues);

        if (inputColumns.length!=inputValues.length){
            throw new Error('Number of columns and values is not equal');
        }

        const whereQuery: string[] = [];
        let whereParameter: string = ''
        for (let i=0; i<inputColumns.length ; i++) {
            if (Array.isArray(inputValues[i])) {
                const [value1, value2] = inputValues[i] as number[];
                whereParameter = `${inputColumns[i]} BETWEEN ${value1} AND ${value2}`;
            } else {
                whereParameter = `${inputColumns[i]} = ${inputValues[i]}`;
            }
            whereQuery.push(whereParameter);
        } 

        query = `SELECT ${tableColumns} FROM public."Posts" WHERE ${whereQuery.join(' AND ')}`;
    }

    return query;
}


 const checkIfColumnInTable = async(inputColumns: string[], tableColumns: string[]) => {
    
    for (let column of inputColumns) {
        // console.log(column)
        // console.log(tableColumns)
        if (!tableColumns.includes(column)) {
            // console.log(column)
            // console.log(tableColumns)
            throw new Error('Column name does not exist in table');     
        }
    }
    return true;
}

const createWhere = (columnName: string, val1?:(string|number), val2?:(string|number)): string =>  {
    let query: string = ''
    if (typeof val1 === 'string'){
        query = `FROM public."Posts" WHERE "${columnName}" = '${val1}'`
    } else {
        if (val1 && val2) {
            query= `FROM public."Posts" WHERE "${columnName}" BETWEEN '${val1} AND '${val2}'`
        } else if (val1 && !val2){
            query = `FROM public."Posts" WHERE "${columnName}" < '${val1}'`
        } else if (!val1 && val2) {
            query = `FROM public."Posts" WHERE "${columnName}" > '${val2}'`
        } else {
            throw new Error('No value provided')
        }
    }
    return query
}

const generateQueryParameters = (columns: string[], values: (string|number)[]) => {
    let comlumnsQuery: string[] = ['('];
    let valuesQuery: string[] = ['('];

    for (let i=1; i<columns.length+1; i++) {
        comlumnsQuery.push(`$${i}`);
        valuesQuery.push(`$${i+columns.length}`);
    }

    comlumnsQuery.push(')')
    valuesQuery.push(')')
    
    return comlumnsQuery.toString(), valuesQuery.toString()
}

const addDoubleQuotes = async(arr: (string)[]) => {
    for (let i = 0; i < arr.length; i++) {  
        if (!arr[i].includes('"')) {
            arr[i] = `"${arr[i]}"`;
        }
    }
}

const addSingleQuotes = async(arr: (string|number|number[])[]) => {
    for (let i = 0; i < arr.length; i++) {
        if ((typeof arr[i] === 'number') || (Array.isArray(arr[i]))) {
            continue;
        } else {
            let stringValue = arr[i] as string;
            if (!stringValue.includes("'")) {
                arr[i] = `'${stringValue}'`;
            }
        }
    }
}


export default queryGenerator;