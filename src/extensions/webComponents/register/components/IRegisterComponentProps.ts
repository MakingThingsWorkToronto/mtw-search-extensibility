import { ServiceScope } from '@microsoft/sp-core-library';

export interface IRegisterComponentProps {

    className?:string;

    checkStatusEndpoint?:string;

    registerEndpoint?:string;

    unregisterEndpoint?:string;

    userId?:string;

    sessionName?:string;
    
    sessionGuid?:string;

    sessionId?:number;
    
    serviceScope?:ServiceScope;
}
