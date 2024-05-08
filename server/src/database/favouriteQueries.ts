const getAllQueriesItem: string = `SELECT "Brand", "Model", "Generation", "CapacityLow", "CapacityHigh", "HorsepowerLow", "HorsepowerHigh", "MilageLow", "MilageHigh", "Fueltype", "Gearbox", "ProductionYearLow", "ProductionYearHigh", "PriceLow", "PriceHigh", "Segment", "DriveType"
FROM public."Queries" WHERE "Id" = `

const columnsQueriesTable: string[] = ["Brand", "Model", "Generation", "CapacityLow", "CapacityHigh", "HorsepowerLow", "HorsepowerHigh", "MilageLow", "MilageHigh", "Fueltype", "Gearbox", "ProductionYearLow", "ProductionYearHigh", "PriceLow", "PriceHigh", "Segment", "DriveType"]

const insertDataToQueriesTable: string = `INSERT INTO public."Queries"( "Brand", "Model", "Generation", "CapacityLow", "CapacityHigh", "HorsepowerLow", "HorsepowerHigh", "MilageLow", "MilageHigh", "Fueltype", "Gearbox", "ProductionYearLow", "ProductionYearHigh", "PriceLow", "PriceHigh", "Segment", "DriveType") VALUES `

const columnsFavouriteTable: string[] = ["QueriesFK", "UsersEmailFK", "Name"]

const insertDataToFavouriteTable: string = `INSERT INTO public."FavouriteQueries"( "QueriesFK", "UsersEmailFK", "Name") VALUES`

const deleteFromFavouriteTableByQueriesFK: string = `DELETE FROM public."FavouriteQueries" WHERE "QueriesFK" = `

const getUserFavourites: string = `SELECT "QueriesFK" FROM public."FavouriteQueries" WHERE "UsersEmailFK" = `

const getUserFavouritesParams: string = `SELECT "Id", "Brand", "Model", "Generation", "CapacityLow", "CapacityHigh", "HorsepowerLow", "HorsepowerHigh", "MilageLow", "MilageHigh", "Fueltype", "Gearbox", "ProductionYearLow", "ProductionYearHigh", "PriceLow", "PriceHigh", "Segment", "DriveType"
FROM public."Queries" WHERE "Id" IN `

module.exports = {
    getUserFavourites,
    deleteFromFavouriteTableByQueriesFK,
    getAllQueriesItem,
    columnsQueriesTable,
    insertDataToQueriesTable,
    columnsFavouriteTable,
    insertDataToFavouriteTable,
    getUserFavouritesParams
}




