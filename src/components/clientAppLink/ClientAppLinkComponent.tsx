import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from 'search-extensibility';
import { Link } from 'office-ui-fabric-react/lib/Link';
import styles from './ClientAppLinkComponent.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { initializeFileTypeIcons, getFileTypeIconProps, FileTypeIconSize } from '@uifabric/file-type-icons';
import { Office } from '../../models/OfficeAppRegistrations';

export interface IClientAppComponentProps {

    /**
     * The label to display on the link
     */
    title?:string;

    /**
     * The document URL to hyperlink
     */
    url?:string;

    /**
     * The document filetype
     */
    fileType?:string;

    /**
     * Icon size
     */
    iconSize?:FileTypeIconSize;

    /**
     * The scheme to use to open the document
     */
    scheme?:string;

    /**
     * The default save folder
     */
    defaultSaveFolder?:string;

    /** 
     * The icon to display to the left of the field value
     */
    icon?:string;

    /**
     * The link CSS Class
     */
    linkCssClass?:string;
    
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
    
    public componentDidMount(){        
        initializeFileTypeIcons();
    }
        
    public render() {

        // See more here: https://docs.microsoft.com/en-us/office/client-developer/office-uri-schemes?redirectedfrom=MSDN
        // examples:
        // - https://stackoverflow.com/questions/27527672/mimic-sharepoint-edit-office-file-download
        // - window.location.href = "ms-word:ofe|u|https://website.sharepoint.com/sites/sitename/Shared%20Documents/1.docx";

        let inputsValid = true;
        const url = this.getUrl();
        if(!url) inputsValid = this.badInput("The data-url attribute is required.");
        if(!this.props.fileType) inputsValid = this.badInput("The  data-filetype attribute is required.");
        if(!this.props.title) inputsValid = this.badInput("The data-title attribute is required.");
        if(!inputsValid) return "";

        const scheme :string = !this.props.scheme ? "view" : this.props.scheme;
        const iconSize:FileTypeIconSize = this.props.iconSize || 32;
        const linkCssClass:string = this.props.linkCssClass 
                                ? styles.link + " " + this.props.linkCssClass 
                                : styles.link;
        
        const iconCssClass:string = this.props.iconCssClass
                                ? styles.icon + " " + this.props.iconCssClass 
                                : styles.icon;

        const iconJSX: JSX.Element = <Icon {...getFileTypeIconProps({extension: this.props.fileType, size: iconSize})} className={iconCssClass} />;

        let link:string = Office.formatLink(scheme, this.props.fileType, this.props.url, this.props.defaultSaveFolder);

        return <div className={styles.clientAppComponent}>
            {iconJSX}
            <Link className={linkCssClass} title={this.props.title} href={link}>{this.props.title}</Link>
        </div>;

    }

    private badInput(message:string) : boolean{
        console.log("ClientAppLinkComponent: " + message);
        return false;
    }

    private getUrl() : string {
        return (this.props.url && this.props.url.length>0)  ? this.props.url.trim() : null;
    }

}

export class ClientAppLinkWebComponent extends BaseWebComponent {
   
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