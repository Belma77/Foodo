import { Customer } from "./customer";

export class Location {
    latitude!:number;
    longitude!:number;
    formatedAdress: string | undefined;
    floor?:number;
    apartmentNo?:string;
    note?:string;
    
}