import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from 'search-extensibility';
import { isEmpty } from '@microsoft/sp-lodash-subset';

export interface IPageTitleComponentProps {

    /**
     * The label to display in the title of the page
     */
    title?:string;

    /** 
     * Page title selector
     */
    selector?:string;

}

export interface IPageTitleComponentState {
    show?: boolean;
}

export class PageTitleComponent extends React.Component<IPageTitleComponentProps, IPageTitleComponentState> {
    
    private _originalTitle : string = "";

    constructor(props: IPageTitleComponentProps) {
        super(props);
    }

    public componentWillUnmount(){
        document.title = this._originalTitle;
    }

    public render() {

        let inputsValid = true;
        if(!this.props.title) inputsValid = this.badInput("The data-title attribute is required.");

        const selector = this.props.selector && !isEmpty(this.props.selector) ? this.props.selector : "div[data-automation-id='authorByLine']";

        if(inputsValid) {
            const te = document.querySelectorAll(selector);
            if(te && te.length) {
                const ps = te[0].previousElementSibling;
                this._originalTitle = ps.textContent;
                ps.textContent = document.title = this.props.title;
            } else {
                console.log("PageTitleComponent: Query selector not returning any results.");
            }
        }

        return null;

    }

    private badInput(message:string) : boolean{
        console.log("PageTitleComponent: " + message);
        return false;
    }

}

export class PageTitleWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
       let props = this.resolveAttributes();

       // You can use this._ctx here to access current Web Part context
       const customComponent = <PageTitleComponent {...props}/>;
       ReactDOM.render(customComponent, this);
    }    
}