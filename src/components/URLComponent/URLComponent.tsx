import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from '../../models/BaseWebComponent';
import { IconButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
import styles from './URLComponent.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { values, initializeIcons, Label } from 'office-ui-fabric-react';



export interface IURLComponentProps {

    /**
     * The label to display before the link
     */
    title?:string;

    /**
     * The new label to appear as the hyperlink text
     */
    text?:string;

    /**
     * The value of the hyperlink including URL,Label
     */
    value?:string;
    
    /** 
     * The icon to display to the left of the field value
     */
    icon?:string;

}

export interface IURLComponentState {
    show?: boolean;
}

export class URLComponent extends React.Component<IURLComponentProps, IURLComponentState> {
    
    constructor(props: IURLComponentProps) {
        super(props);
    }
    
    protected async onInit(): Promise<void> {
        initializeIcons();
    }
        
    public render() {

        const value = this.getValue();
        let iconJSX: JSX.Element = null;
        let titleJSX: JSX.Element = null;
        let link:string = "";
        let label: string = "";

        if(!value) return "";
        
        const urlParts = value.split(", ");
        link = urlParts[0];
        label = urlParts.length > 1 ? urlParts[1] : "";

        if(this.props.text) label = this.props.text;

        if(this.props.icon && this.props.icon.trim().length>0) iconJSX = <Icon iconName={this.props.icon.trim()} className={styles.icon} />;
        
        if(this.props.title && this.props.title.trim().length > 0) titleJSX = <Label className={styles.urlLabel} title={this.props.title}>{this.props.title}</Label>;

        return <div className={styles.urlComponent}>
            {iconJSX}{titleJSX}
            <Link className={styles.urlLink} title={label}>{label}</Link>
        </div>;

    }

    private getValue() : string {
        
        return (this.props.value && this.props.value.length>0)  ? this.props.value.trim() : null;

    }

}

export class URLComponentWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
       let props = this.resolveAttributes();

       // You can use this._ctx here to access current Web Part context
       const customComponent = <URLComponent {...props}/>;
       ReactDOM.render(customComponent, this);
    }    
}