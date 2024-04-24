

export interface favouriteParameters {
    userEmail: string,
    queryName: string,
    inputColumns: string[],
    inputValues: (string|number)[]

} 

export interface searchParameters {
    Brand: string|null;
    Model: string|null;
    Generation: string|null;
    CapacityLow: number;
    CapacityHigh: number;
    HorsepowerLow: number;
    HorsepowerHigh: number;
    MilageLow: number;
    MilageHigh: number;
    Fueltype: string|null;
    Gearbox: string|null;
    ProductionYearLow: number;
    ProductionYearHigh: number;
    PriceLow: number;
    PriceHigh: number;
    Segment: string|null;
    DriveType: string|null;
} 


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
