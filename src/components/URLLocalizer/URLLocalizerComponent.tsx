import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from '../../models/BaseWebComponent';
import { IconButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
import styles from './URLLocalizerComponent.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { values, initializeIcons, Label } from 'office-ui-fabric-react';



export interface IURLLocalizerComponentProps {

    /**
     * The label to display before the link
     */
    siteUrl?:string;

    /**
     * The html to display
     */
    html?:string;

}

export interface IURLLocalizerComponentState {
    show?: boolean;
}

export class URLLocalizerComponent extends React.Component<IURLLocalizerComponentProps, IURLLocalizerComponentState> {
    
    constructor(props: IURLLocalizerComponentProps) {
        super(props);
    }
        
    public render() {
        
        return (this.props.html && this.props.html.trim().length>0)  
            ? <div dangerouslySetInnerHTML={this.getHtml()}></div>
            : null;

    }

    private getHtml() { return { __html : this.props.html }; }

}

export class URLLocalizerWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
        let props = this.resolveAttributes();
        let imgs = this.querySelectorAll("img");
        if(props.siteUrl && imgs.length > 0) {
            imgs.forEach((img : HTMLImageElement) => {
                const s = img.src;
                if(s && s.length > 0 && s.charAt(0) === "/") {
                    img.src = props.siteUrl + img.src;
                }
            });
            props.html = this.innerHTML;
            // You can use this._ctx here to access current Web Part context
            const customComponent = <URLLocalizerComponent {...props}/>;
            ReactDOM.render(customComponent, this);
        } 
        
    }    
}