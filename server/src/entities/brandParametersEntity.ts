export interface CarData {
    Brand: string;
    Model: string;
    Generation: string | null;
}

export interface BrandModelsGenerations {
    [brand: string]: {
        [model: string]: string[] | null;
    };
}

