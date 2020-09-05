import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from 'search-extensibility';
import { IconButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
import styles from './ClientAppComponent.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { values, initializeIcons, Label } from 'office-ui-fabric-react';



export interface IClientAppComponentProps {

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

export interface IClientAppComponentState {
    show?: boolean;
}

export class ClientAppComponent extends React.Component<IClientAppComponentProps, IClientAppComponentState> {
    
    constructor(props: IClientAppComponentProps) {
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
        let linkCssClass:string = this.props.linkCssClass 
                                ? styles.link + " " + this.props.linkCssClass 
                                : styles.link;
        
        let labelCssClass:string = this.props.labelCssClass 
                                ? styles.label + " " + this.props.labelCssClass
                                : styles.label;

        let iconCssClass:string = this.props.iconCssClass
                                ? styles.icon + " " + this.props.iconCssClass 
                                : styles.icon;

        if(!value) return "";
        
        // See more here: https://docs.microsoft.com/en-us/office/client-developer/office-uri-schemes?redirectedfrom=MSDN
        // examples:
        // - https://stackoverflow.com/questions/27527672/mimic-sharepoint-edit-office-file-download
        // - window.location.href = "ms-word:ofe|u|https://website.sharepoint.com/sites/sitename/Shared%20Documents/1.docx";

        const urlParts = value.split(", ");
        link = urlParts[0];
        label = urlParts.length > 1 ? urlParts[1] : "";

        if(this.props.text) label = this.props.text;

        if(this.props.icon && this.props.icon.trim().length>0) iconJSX = <Icon iconName={this.props.icon.trim()} className={iconCssClass} />;
        
        if(this.props.title && this.props.title.trim().length > 0) titleJSX = <Label className={labelCssClass} title={this.props.title}>{this.props.title}</Label>;

        return <div className={styles.clientAppComponent}>
            {iconJSX}{titleJSX}
            <Link className={linkCssClass} title={label} href={link}>{label}</Link>
        </div>;

    }

    private getValue() : string {
        
        return (this.props.value && this.props.value.length>0)  ? this.props.value.trim() : null;

    }

}

export class ClientAppLinkComponentWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
       let props = this.resolveAttributes();

       // You can use this._ctx here to access current Web Part context
       const customComponent = <ClientAppComponent {...props}/>;
       ReactDOM.render(customComponent, this);
    }    
}