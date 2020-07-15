import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from '../../models/BaseWebComponent';
import { IconButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { values, initializeIcons, Label } from 'office-ui-fabric-react';

export interface IPageTitleComponentProps {

    /**
     * The label to display in the title of the page
     */
    title?:string;


}

export interface IPageTitleComponentState {
    show?: boolean;
}

export class PageTitleComponent extends React.Component<IPageTitleComponentProps, IPageTitleComponentState> {
    
    private _originalTitle : string = "";

    constructor(props: IPageTitleComponentProps) {
        super(props);
    }
    
    protected async onInit(): Promise<void> {
        initializeIcons();
    }

    public componentWillUnmount(){
        document.title = this._originalTitle;
    }

    public render() {

        // The title is always the sibling before the authorByline_* element

        let inputsValid = true;
        if(!this.props.title) inputsValid = this.badInput("The data-title attribute is required.");

        if(inputsValid) {
            const te = document.querySelectorAll("div[class^='authorByline_']")[0].previousElementSibling;
            this._originalTitle = te.textContent;
            te.textContent = document.title = this.props.title;
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