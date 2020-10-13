import { IExtensionContext } from "search-extensibility";

export interface IRatingsComponentProps {

    siteUrl?: string;

    itemId?:number;

    listId?:string;

    rating?:number;

    label?:string;

    className?:string;

    rateEndpoint?:string;

    user?:string;

    context?:IExtensionContext;
    
}
