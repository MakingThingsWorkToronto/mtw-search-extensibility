import { WebPartContext } from "@microsoft/sp-webpart-base";
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { IFlowResult } from "../models/IFlowResult";

export default class FlowService {
    
    private _context: WebPartContext;

    constructor(context:WebPartContext) {
        this._context = context;
    }

    public async runFlow(endpoint:string, params:any) : Promise<IFlowResult> {
        
        return await this._context.httpClient.post(endpoint,
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
        
        const res = (await value.json()) as IFlowResult;
            
        return typeof res["error"] != "undefined"
            ? { success: false, status: res["error"]["code"] + ": " + res["error"]["message"] }
            : res;

    }


}