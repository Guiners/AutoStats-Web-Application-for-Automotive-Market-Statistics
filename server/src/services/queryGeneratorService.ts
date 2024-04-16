const checkIfColumnInTable = (inputColumns: string[], tableColumns: string[]) => {
    for (let column of inputColumns) {
        if (!tableColumns.includes(column)) {
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

const queryGenerator = async(inputColumns: string[], inputValues: (string|number)[], tableColumns: string[]) => {
    
    if (inputColumns.length!=inputValues.length){
        throw new Error('Number of columns and values is not equal');
    }

    checkIfColumnInTable(inputColumns, tableColumns);
 
    // const queryParameters = generateQueryParameters(inputColumns, inputValues);

    // const comlumnsQuery: string = queryParameters[0];
    // const valuesQuery: string = queryParameters[1];

    let whereQuery: string[] = [];

    for (let i=0; i<inputColumns.length ; i++) {
        const whereParameter: string = `${inputColumns[i]} = ${inputValues[i]}`;
        whereQuery.push(whereParameter);
    }

    const query: string = `SELECT ${inputColumns} FROM public."Posts" WHERE ${whereQuery.join(' AND ')}`;

    return query;
}

export default queryGenerator;