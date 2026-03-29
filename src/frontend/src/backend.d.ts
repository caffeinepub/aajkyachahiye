import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Provider {
    categories: Array<string>;
    consent: boolean;
    city: string;
    businessName: string;
    timestamp: bigint;
    phone: string;
    serviceAreas: string;
}
export interface Demand {
    consent: boolean;
    timing: string;
    name: string;
    need: string;
    timestamp: bigint;
    phone: string;
    budget?: string;
    location: string;
}
export interface backendInterface {
    getDemand(id: bigint): Promise<Demand>;
    getDemands(): Promise<Array<Demand>>;
    getProviders(): Promise<Array<Provider>>;
    postDemand(name: string, phone: string, location: string, need: string, timing: string, budget: string | null, consent: boolean): Promise<bigint>;
    registerProvider(businessName: string, phone: string, city: string, categories: Array<string>, serviceAreas: string, consent: boolean): Promise<bigint>;
}
