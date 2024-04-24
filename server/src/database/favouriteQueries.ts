const getAllQueriesItem: string = `SELECT "Id", "Brand", "Model", "Generation", "CapacityLow", "CapacityHigh", "HorsepowerLow", "HorsepowerHigh", "MilageLow", "MilageHigh", "Fueltype", "Gearbox", "ProductionYearLow", "ProductionYearHigh", "PriceLow", "PriceHigh", "Segment", "DriveType"
FROM public."Queries";`

const columnsQueriesTable: string[] = ["Brand", "Model", "Generation", "CapacityLow", "CapacityHigh", "HorsepowerLow", "HorsepowerHigh", "MilageLow", "MilageHigh", "Fueltype", "Gearbox", "ProductionYearLow", "ProductionYearHigh", "PriceLow", "PriceHigh", "Segment", "DriveType"]

const insertDataToQueriesTable: string = `INSERT INTO public."Queries"( "Brand", "Model", "Generation", "CapacityLow", "CapacityHigh", "HorsepowerLow", "HorsepowerHigh", "MilageLow", "MilageHigh", "Fueltype", "Gearbox", "ProductionYearLow", "ProductionYearHigh", "PriceLow", "PriceHigh", "Segment", "DriveType") VALUES ();`


const columnsFavouriteTable: string[] = ["QueriesFK", "UsersEmailFK", "Name"]

const insertDataToFavouriteTable: string = `'INSERT INTO public."FavouriteQueries"("Id", "QueriesFK", "UsersEmailFK", "Name") VALUES ();'`

const deleteFromFavouriteTableByQueriesFK: string = `DELETE FROM public."FavouriteQueries" WHERE "QueriesFK" = `

module.exports = {
    deleteFromFavouriteTableByQueriesFK,
    getAllQueriesItem,
    columnsQueriesTable,
    insertDataToQueriesTable,
    columnsFavouriteTable,
    insertDataToFavouriteTable
}




