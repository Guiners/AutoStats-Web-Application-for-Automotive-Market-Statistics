const getAllItem: string = `SELECT "Id", "Brand", "Model", "Generation", "Capacity", "Horsepower", "Milage", "Fueltype", "Gearbox", "ProductionYear", "Price", "Segment", "DriveType"
FROM public."Posts" LIMIT 20;`

const columnsPostsTable: string[] = ["Id", "Brand", "Model", "Generation", "Capacity", "Horsepower", "Milage", "Fueltype", "Gearbox", "ProductionYear", "Price", "Segment", "DriveType"]

const distinctBrandModelGen: string = `SELECT DISTINCT "Brand", "Model", "Generation" FROM public."Posts" ORDER BY "Brand", "Model", "Generation"`;
const distinctFuelType: string = `SELECT DISTINCT "Fueltype" FROM public."Posts"`;
const distinctGearBox: string = `SELECT DISTINCT "Gearbox" FROM public."Posts"`;


// `SELECT "Id","Brand","Model","Generation","Capacity","Horsepower",
// "Milage","Fueltype","Gearbox","ProductionYear","Price","Segment","DriveType" 
// FROM public."Posts" WHERE "Brand" = 'bmw'`

module.exports = {
    getAllItem,
    columnsPostsTable,
    distinctBrandModelGen,
    distinctFuelType,
    distinctGearBox
}