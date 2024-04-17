const checkIfColumnInTable = async(inputColumns: string[], tableColumns: string[]) => {
    
    for (let column of inputColumns) {
        // console.log(column)
        // console.log(tableColumns)
        if (!tableColumns.includes(column)) {
            console.log(column)
            console.log(tableColumns)
            throw new Error('Column name does not exist in table');     
        }
    }
    return true;
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

const addSingleQuotes = async(arr: (string|number)[]) => {
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'number') {
            continue;
        } else {
            let stringValue = arr[i] as string;
            if (!stringValue.includes("'")) {
                arr[i] = `'${stringValue}'`;
            }
        }
    }
}

const queryGenerator = async(inputColumns: string[], tableColumns: string[], inputValues?: (string|number)[],) => {
    
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

        let whereQuery: string[] = [];
        
        for (let i=0; i<inputColumns.length ; i++) {
            const whereParameter: string = `${inputColumns[i]} = ${inputValues[i]}`;
            whereQuery.push(whereParameter);
        }

        // query = `SELECT ${inputColumns} FROM public."Posts" WHERE ${whereQuery.join(' AND ')}`;
        query = `SELECT ${tableColumns} FROM public."Posts" WHERE ${whereQuery.join(' AND ')}`;
        // console.log(query);

    }

    return query;
}

export default queryGenerator;