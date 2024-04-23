const getAllFavouriteItem: string = `SELECT "Id", "Brand", "Model", "Generation", "CapacityHigh", "CapacityLow", "HorsepowerHigh", "HorsepowerLow", "MilageHigh", "MilageLow", "Fueltype", "Gearbox", "ProductionYearHigh", "ProductionYearLow", "PriceHigh", "PriceLow", "Segment", "DriveType"
FROM public."Queries";`

const columnsFavouriteTable: string[] = ["Id", "Brand", "Model", "Generation", "CapacityHigh", "CapacityLow", "HorsepowerHigh", "HorsepowerLow", "MilageHigh", "MilageLow", "Fueltype", "Gearbox", "ProductionYearHigh", "ProductionYearLow", "PriceHigh", "PriceLow", "Segment", "DriveType"]

const insertDataToFavouriteTable: string = `INSERT INTO public."Queries"( "Id", "Brand", "Model", "Generation", "CapacityLow", "CapacityHigh", "HorsepowerLow", "HorsepowerHigh", "MilageLow", "MilageHigh", "Fueltype", "Gearbox", "ProductionYearLow", "ProductionYearHigh", "PriceLow", "PriceHigh", "Segment", "DriveType") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`

module.exports = {
    getAllFavouriteItem,
    columnsFavouriteTable,
    insertDataToFavouriteTable
}