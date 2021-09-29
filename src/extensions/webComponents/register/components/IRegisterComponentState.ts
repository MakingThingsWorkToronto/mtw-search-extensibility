export interface IRegisterComponentState {
    checkingStatus: boolean;
    registered:boolean;
    calloutTarget:string;
    changingRegistration:boolean;
    progressMessage:string;
    changedRegistration:boolean;
    changedMessage:string;
    error:boolean;
    registrationId?:number;
}
