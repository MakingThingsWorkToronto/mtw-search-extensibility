import { ServiceScope } from "@microsoft/sp-core-library";

export interface IRatingsComponentProps {

    siteUrl?: string;

    itemId?:number;

    listId?:string;

    rating?:number;

    label?:string;

    className?:string;

    rateEndpoint?:string;

    user?:string;

    serviceScope?: ServiceScope;
    
}
