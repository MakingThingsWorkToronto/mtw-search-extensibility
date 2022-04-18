import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';  
import { ServiceScope } from "@microsoft/sp-core-library";

export class RestService {  

    private _serviceScope: ServiceScope;

    constructor(serviceScope:ServiceScope) {
        this._serviceScope = serviceScope;
    }

    public async json(url:string, method:string, headers: Headers, body: string) {  
  
        const http = new HttpClient(this._serviceScope);
        const lowMethod = method && method != "" ? method.toLowerCase() : "";
        const httpMethod = http[lowMethod];

        if(!url || url.trim().length === 0) throw new TypeError("RestService: invalid URL: " + url + ". Please fix the method used and try again.");

        if(typeof httpMethod !== "function") throw new TypeError("RestService: invalid method type: " + method + ". Please fix the method used and try again.");

        const options : IHttpClientOptions = {
            method: lowMethod.toUpperCase(),
            headers: new Headers({
                "accept":"application/json"
            })
        };

        if(body) options.body = body;
        if(headers) options.headers = headers;
        let response:HttpClientResponse = null;

        if(lowMethod === "get") {
            
            response = await http.get(url, HttpClient.configurations.v1, options);

        } else if(lowMethod === "post") {

            response = await http.post(url, HttpClient.configurations.v1, options);

        } else if(lowMethod === "fetch") {

            response = await http.fetch(url, HttpClient.configurations.v1, options);

        }

        return response ? await response.json() : {};


    }  

}  