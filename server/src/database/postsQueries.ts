const getAllItem: string = `SELECT "Id", "Brand", "Model", "Generation", "Capacity", "Horsepower", "Milage", "Fueltype", "Gearbox", "ProductionYear", "Price", "Segment", "DriveType"
FROM public."Posts" LIMIT 20;`

const columnsPostsTable: string[] = ["Id", "Brand", "Model", "Generation", "Capacity", "Horsepower", "Milage", "Fueltype", "Gearbox", "ProductionYear", "Price", "Segment", "DriveType"]


// `SELECT "Id","Brand","Model","Generation","Capacity","Horsepower",
// "Milage","Fueltype","Gearbox","ProductionYear","Price","Segment","DriveType" 
// FROM public."Posts" WHERE "Brand" = 'bmw'`

module.exports = {
    getAllItem,
    columnsPostsTable
}