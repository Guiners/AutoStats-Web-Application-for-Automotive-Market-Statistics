const getAllFavouriteItem: string = `SELECT "Id", "Brand", "Model", "Generation", "CapacityHigh", "CapacityLow", "HorsepowerHigh", "HorsepowerLow", "MilageHigh", "MilageLow", "Fueltype", "Gearbox", "ProductionYearHigh", "ProductionYearLow", "PriceHigh", "PriceLow", "Segment", "DriveType"
FROM public."Queries";`

const columnsFavouriteTable: string[] = ["Id", "Brand", "Model", "Generation", "CapacityHigh", "CapacityLow", "HorsepowerHigh", "HorsepowerLow", "MilageHigh", "MilageLow", "Fueltype", "Gearbox", "ProductionYearHigh", "ProductionYearLow", "PriceHigh", "PriceLow", "Segment", "DriveType"]

module.exports = {
    getAllFavouriteItem,
    columnsFavouriteTable
}