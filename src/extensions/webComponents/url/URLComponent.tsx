import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from 'search-extensibility';
import { Link } from '@fluentui/react/lib/Link';
import styles from './URLComponent.module.scss';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Icon } from '@fluentui/react/lib/Icon';
import { Label } from '@fluentui/react/lib/Label';

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

    /**
     * The link CSS Class
     */
    linkCssClass?:string;
    
    /**
     * The label CSS Class
     */
    labelCssClass?:string;

    /**
     * The icon CSS Class
     */
    iconCssClass?:string;
    
}

export interface IURLComponentState {
    show?: boolean;
}

export class URLComponent extends React.Component<IURLComponentProps, IURLComponentState> {
    
    constructor(props: IURLComponentProps) {
        super(props);
    }
    
    public componentDidMount(){        
        initializeIcons();
    }
        
    public render() {

        const value = this.getValue();
        let iconJSX: JSX.Element = null;
        let titleJSX: JSX.Element = null;
        let link:string = "";
        let label: string = "";
        let linkCssClass:string = this.props.linkCssClass 
                                ? styles.urlLink + " " + this.props.linkCssClass 
                                : styles.urlLink;
        
        let labelCssClass:string = this.props.labelCssClass 
                                ? styles.urlLabel + " " + this.props.labelCssClass
                                : styles.urlLabel;

        let iconCssClass:string = this.props.iconCssClass
                                ? styles.icon + " " + this.props.iconCssClass 
                                : styles.icon;

        if(!value) return "";
        
        const urlParts = value.split(", ");
        link = urlParts[0];
        label = urlParts.length > 1 ? urlParts[1] : "";

        if(this.props.text) label = this.props.text;

        if(this.props.icon && this.props.icon.trim().length>0) iconJSX = <Icon iconName={this.props.icon.trim()} className={iconCssClass} />;
        
        if(this.props.title && this.props.title.trim().length > 0) titleJSX = <Label className={labelCssClass} title={this.props.title}>{this.props.title}</Label>;

        return <div className={styles.urlComponent}>
            {iconJSX}{titleJSX}
            <Link className={linkCssClass} title={label} href={link}>{label}</Link>
        </div>;

    }

    private getValue() : string {
        
        return (this.props.value && this.props.value.length>0)  ? this.props.value.trim() : null;

    }

}

export class URLWebComponent extends BaseWebComponent {
   
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