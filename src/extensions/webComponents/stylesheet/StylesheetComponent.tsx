import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from 'search-extensibility';
import { SPComponentLoader } from '@microsoft/sp-loader';

export interface IStylesheetComponentProps {

    /**
     * The label to display before the link
     */
    href?:string;

}

export interface IStylesheetComponentState {}

export class StylesheetComponent extends React.Component<IStylesheetComponentProps, IStylesheetComponentState> {
    
    constructor(props: IStylesheetComponentProps) {
        super(props);
    }
    
    public componentDidMount() {
        if(this.props.href) SPComponentLoader.loadCss(this.props.href);
    }
        
    public render() {
        return null;
    }

}

export class StylesheetWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
       let props = this.resolveAttributes();

       // You can use this._ctx here to access current Web Part context
       const customComponent = <StylesheetComponent {...props}/>;
       ReactDOM.render(customComponent, this);
    }    
}