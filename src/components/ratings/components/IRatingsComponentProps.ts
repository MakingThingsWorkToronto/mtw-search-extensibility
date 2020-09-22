import { IExtensionContext } from "search-extensibility";

export interface IRatingsComponentProps {

    siteUrl?: string;

    itemId?:number;

    listId?:string;

    rating?:number;

    label?:string;

    className?:string;

    // test endpoint: https://prod-15.canadacentral.logic.azure.com:443/workflows/db1150b76e69484186e50200f66ee1f8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Xrx5hOh2HbJKIeYKVPmqbLEHPKa2E35C1Qo6GkLqZVM
    rateEndpoint?:string;

    user?:string;

    context?:IExtensionContext;
    
}
