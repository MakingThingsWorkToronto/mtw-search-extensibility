import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from 'search-extensibility';
import { ActionButton } from '@fluentui/react/lib/Button';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import styles from './FlowButtonComponent.module.scss';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import FlowService from '../../service/FlowService';
import { IFlowResult } from '../../models/IFlowResult';


export interface IFlowButtonComponentProps {

    /**
     * The label to display on the button
     */
    title?:string;

    /**
     * Failure message
     */
    failure?:string;

    /** 
     * Success message 
     * */
    success?:string;

    /**
     * The endpoint to query
     */
    endpoint?:string;

    /**
     * The JSON body to send to the flow
     */
    body?:string;
    
    /** 
     * The icon to display to the left of the button
     */
    icon?:string;

    /**
     * The CSS class name to apply to the control
     */
    className?:string;

    /**
     * The CSS class name to apply to the success message
     */
    successClass?:string;

    /**
     * The CSS class name to apply to the failure message
     */
    failureClass?:string;

    /** 
     * The web part context 
     **/
    context?:WebPartContext;

}

export interface IFlowButtonComponentState {
    running?: boolean;
    result: IFlowResult;
}

export class FlowButtonComponent extends React.Component<IFlowButtonComponentProps, IFlowButtonComponentState> {
    
    private _svc : FlowService = null;

    constructor(props: IFlowButtonComponentProps) {
        super(props);
        this._svc = new FlowService(props.context);
        this.state = {
            running: false,
            result: null
        };
    }
    
    public componentDidMount(){        
        initializeIcons();
    }
        
    public render() {

        let isValid = true;

        if(!this.props.title) isValid = this.badInput("The data-title attribute is required.");
        if(!this.props.endpoint) isValid = this.badInput("The data-endpoint attribute is required.");
        if(!this.props.body) isValid = this.badInput("The data-body attribute is required.");
        if(!this.props.success) isValid = this.badInput("The data-success attribute is required.");
        if(!this.props.failure) isValid = this.badInput("The data-failure attribute is required.");

        if(!isValid) return "";

        let icon =  { iconName: 'Play' };
        const className = styles.runFlowButton + " " + this.props.className;

        if(this.props.icon && this.props.icon.trim().length > 0) icon = { iconName: this.props.icon };
        
        const flowButton =  <div className={styles.flowButtonComponent}>
            <ActionButton iconProps={icon} className={className} title={this.props.title} onClick={this._runFlow.bind(this)} >{this.props.title}</ActionButton>
        </div>;

        if(this.state.running) {

            return <Spinner size={SpinnerSize.small} />;

        } else {
 
            if(this.state.result) {

                if(this.state.result.success) {

                    return <MessageBar messageBarType={MessageBarType.success} className={this.props.successClass}>{this.props.success}</MessageBar>;

                } else {

                    return <div><MessageBar messageBarType={MessageBarType.error} className={this.props.failureClass}>{this.props.failure}</MessageBar>{flowButton}</div>;

                }

            } else {

                return flowButton;
                
            }
        }

    }

    private async _runFlow() : Promise<void> {
        
        this.setState({
            running: true
        });

        const body = JSON.parse(this.props.body);

        return this._svc.runFlow(this.props.endpoint, body)
                .then((result)=>{
                    this.setState({
                        running: false,
                        result: result
                    });
                });

    }

    private badInput(message:string) : boolean{
        console.log("FlowButtonComponent: " + message);
        return false;
    }

}

export class FlowButtonWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
        let props = this.resolveAttributes();
        
        props.context = this.context;

        // You can use this._ctx here to access current Web Part context
        const customComponent = <FlowButtonComponent {...props}/>;
        ReactDOM.render(customComponent, this);

    }    
}