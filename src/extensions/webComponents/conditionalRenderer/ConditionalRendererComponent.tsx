import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from '@pnp/modern-search-extensibility';
import styles from './ConditionalRendererComponent.module.scss';
import Jexl from 'jexl/dist/Jexl';
import { RestService } from '../../../service/RestService';
import { ServiceScope } from "@microsoft/sp-core-library";

export interface IConditionalRendererComponentProps {

    /**
     * The service scope for the request
     */
    serviceScope?:ServiceScope;

    /**
     * The child nodes to render if condition is met
     */
    children?:string;

    /**
     * The URI to the json service to call
     */
    restEndpoint?:string;

    /**
     * The Http method to call
     */
    method?:string;

    /**
     * The body data to include with the request
     */
    body?:string;

    /**
     * Request headers to include with the request
     */
    headers?:string;

    /** 
     * The condition to test against the result for truthiness
     */
    conditions?:string;
    
}

export interface IConditionalRendererComponentState {
    show?: boolean;
}

export class ConditionalRendererComponent extends React.Component<IConditionalRendererComponentProps, IConditionalRendererComponentState> {
    
    private _service : RestService = null;
    private _testing:boolean = false;
    private _tested:boolean = false;

    constructor(props: IConditionalRendererComponentProps) {
        super(props);

        this._service = new RestService(props.serviceScope);

        this.state = {
            show: false
        };

    }
    
    public async componentDidMount() {        
        
        // Call the rest service to run the test
        if(!this._tested) {
            
            this._tested = true;

            // parse conditions out of our property, we accept JSON string array or single string
            let conditions : string[] = [];
            if(this.props.conditions && this.props.conditions.trim().length > 0) {

                
                if(this.props.conditions[0] == "[" && this.props.conditions[this.props.conditions.length-1] == "]") {
                    
                    try {
                        
                        const userConditions = JSON.parse(this.props.conditions);

                        // Try to determine if this is a string array, if it's invalid or not just treat it like a string.
                        if(Array.isArray(userConditions) && userConditions.length > 0 && typeof userConditions[0] === "string") {
                            
                            conditions = userConditions;

                        } else {

                            conditions.push(this.props.conditions);

                        }

                    } catch(ex) { conditions.push(this.props.conditions); }

                } else {

                    conditions.push(this.props.conditions);

                }
                
            }

            let headers : Headers = null;
            if(this.props.headers && this.props.headers.length > 0) {
                const customHeaders = JSON.parse(this.props.headers);
                if(customHeaders) headers = new Headers(customHeaders);
            }

            const responseJson = await this._service.json(this.props.restEndpoint, this.props.method, headers, this.props.body);
            console.log("Conditional Renderer got response: \n" + JSON.stringify(responseJson));

            const allResults = await Promise.all(conditions.map(async (condition:string)=> {
                const result = await Jexl.eval(condition, responseJson);
                console.log("Conditional Renderer: Evaluated " + condition + " to " + result);
                return result;
            }));
            const falseResults = allResults.filter((v)=>!v);

            if(falseResults.length === 0) this.setState({"show":true});

        }

    }
        
    public render() {

        if(this.state.show) {
            return <div className={styles.conditionalRendererComponent} dangerouslySetInnerHTML={{__html: this.props.children}}></div>;
        } else {
            return <div className={styles.conditionalRendererComponentHidden}></div>;
        }

    }

    

}

export class ConditionalRendererWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
        let props = this.resolveAttributes();

        // Get the conditional HTML to render and clear it so end users can't view it.
        props.children = this.innerHTML;
        this.innerHTML = "";

        // Assign the service scope to the conditional renderer
        props.serviceScope = this._serviceScope;

        // You can use this._ctx here to access current Web Part context
        const customComponent = <ConditionalRendererComponent {...props}/>;
        ReactDOM.render(customComponent, this);

    }    
}