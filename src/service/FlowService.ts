import { WebPartContext } from "@microsoft/sp-webpart-base";
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { IFlowResult } from "../models/IFlowResult";
import { ServiceScope } from "@microsoft/sp-core-library";

export default class FlowService {
    
    private _serviceScope: ServiceScope;

    constructor(serviceScope:ServiceScope) {
        this._serviceScope = serviceScope;
    }

    public async runFlow(endpoint:string, params:any) : Promise<IFlowResult> {
        
        return await this._serviceScope.consume(HttpClient.serviceKey).post(endpoint,
            HttpClient.configurations.v1, {
                body: JSON.stringify(params),
                headers: {
                    "content-type": "application/json",
                    "accepts": "application/json"
                }
            }
        ).then(async (value: HttpClientResponse) => {

            return this._processFlowResponse(value);

        }).catch((ex)=>{

            const err = ex as Error;
            console.log("Failure running flow: " + err.message);
            return { success: false, status: ex.message };

        });

    }

    private async _processFlowResponse(value:HttpClientResponse) {
        
        if(value.status === 200) {

            const res = (await value.json()) as IFlowResult;
                
            return typeof res["error"] != "undefined"
                ? { success: false, status: res["error"]["code"] + ": " + res["error"]["message"] }
                : res;
        
        } else {

            return { success: false, status: value.status + (value.statusText ? ": " + value.statusText : "") };

        }

    }


}