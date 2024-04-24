

export interface favouriteParameters {
    userEmail: string,
    queryName: string,
    inputColumns: string[],
    inputValues: (string|number)[]

} 



// export interface searchParameters {
//     Brand?: string;
//     Model?: string;
//     Generation?: string;
//     CapacityHigh?: string;
//     CapacityLow?: string;
//     HorsepowerHigh?: string;
//     HorsepowerLow?: string;
//     MilageHigh?: string;
//     MilageLow?: string;
//     Fueltype?: string;
//     Gearbox?: string;
//     ProductionYearHigh?: string;
//     ProductionYearLow?: string;
//     PriceHigh?: string;
//     PriceLow?: string;
//     Segment?: string;
//     DriveType?: string;
// } 


// export const searchMap = new Map<string, string|string[]>(
//     [
//         ["Brand", "Brand"], 
//         ["Model", "Model"],
//         ["Generation", "Generation"],
//         ["Capacity", ["CapacityLow", "CapacityHigh"]],
//         ["Horsepower", ["HorsepowerLow", "HorsepowerHigh"]],
//         ["Milage", ["MilageLow", "MilageHigh"]],
//         ["Fueltype", "Fueltype"],
//         ["Gearbox", "Gearbox"],
//         ["ProductionYear", ["ProductionYearLow", "ProductionYearHigh"]],
//         ["Price", ["PriceLow", "PriceHigh"]],
//         ["Segment", "Segment"],
//         ["DriveType", "DriveType"]
//     ]
// );


// export const searchMap1 = new Map<string, number|number[]>(
//     [
//         ["Brand", 1], 
//         ["Model", 2],
//         ["Generation", 3],
//         ["Capacity", [4, 5]],
//         ["Horsepower", [6, 7]],
//         ["Milage", [8, 9]],
//         ["Fueltype", 10],
//         ["Gearbox", 11],
//         ["ProductionYear", [12, 13]],
//         ["Price", [14, 15]],
//         ["Segment", 16],
//         ["DriveType", 17]
//     ]
// );
