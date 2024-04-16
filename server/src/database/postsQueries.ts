const getAllItem: string = `SELECT "Id", "Brand", "Model", "Generation", "Capacity", "Horsepower", "Milage", "Fueltype", "Gearbox", "ProductionYear", "Price", "Segment", "DriveType"
FROM public."Posts" LIMIT 20;`

const getSpecificPosts: string = ``

const columnsPostsTable: string[] = ["Id", "Brand", "Model", "Generation", "Capacity", "Horsepower", "Milage", "Fueltype", "Gearbox", "ProductionYear", "Price", "Segment", "DriveType"]

module.exports = {
    getAllItem,
    columnsPostsTable
}