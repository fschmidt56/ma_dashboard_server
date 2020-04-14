//interfaces
export interface IGeoJsonObject {
    name: string,
    type: string,
    features: never[],
}

export interface IPgConnectionParams<T, N> {
    user: T | undefined,
    host: T | undefined,
    database: T | undefined,
    password: T | undefined,
    port: N
}

export interface IPgResultRows {
    long: number;
    lat: number;
    gastro: string,
    bier: string,
    preis: number,
}

export interface IRouteApiObject {
    coordinates: number | number[],
    instructions?: boolean,
    preference: TRoutePreference,
}

//types
export type TRoutePreference = "shortest" | "fastest" | "recommended"
