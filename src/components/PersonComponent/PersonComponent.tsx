import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from '../../models/BaseWebComponent';
import { IconButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
import styles from './PersonComponent.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { values, initializeIcons, Label } from 'office-ui-fabric-react';



export interface IPersonComponentProps {

    /**
     * Author field value including ID
     */
    value?:string;
    
    /**
     * Link type indicating if the link should direct to delve or email
     */
    linkType?:string;

    /** 
     * The icon to display to the left of the list of Person
     */
    icon?:string;

}

export interface IPersonComponentState {
    show?: boolean;
}

export interface IPersonItem {
    name:string;
    email:string;
    userId:string;
    account:string;
}

export class PersonComponent extends React.Component<IPersonComponentProps, IPersonComponentState> {
    
    constructor(props: IPersonComponentProps) {
        super(props);
    }
    
    protected async onInit(): Promise<void> {
        initializeIcons();
    }
        
    public render() {

        const person = this.getPerson();
        let icon: JSX.Element = null;

        if(!person) return "";
        
        const delveUrl = (window.location.protocol + "//" + window.location.host).replace(".sharepoint.com","-my.sharepoint.com")
                                + "/PersonImmersive.aspx?accountname=" + encodeURIComponent(person.userId);

        if(this.props.icon && this.props.icon.trim().length>0) icon = <Icon iconName={this.props.icon.trim()} className={styles.personIcon} />;
        
        return <div className={styles.personComponent}>
            {icon}
            <Link role="menuitem" className={styles.personLink} title={person.name} href={delveUrl} target="_blank" data-interception="off">{person.name}</Link>
        </div>;

    }

    private getPerson() : IPersonItem {
        
        let fieldValue = this.props.value ? this.props.value.trim() : "";

        if(!fieldValue || fieldValue.length==0) return;

        var parts = fieldValue.split(" | ");
        
        if(parts.length == 3) {
        
            var accountParts = parts[2].split(" ");

            return { 
                name: this.getPart(parts[1]),
                email: this.getPart(parts[0]),
                account: this.getPart(accountParts[0]),
                userId: this.getPart(accountParts[1])
            };
        
        }
        
        return null;

    }

    private getPart(value:string) {
        if(value && value.length > 0) return value.trim();
    }

}

export class PersonComponentWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
       let props = this.resolveAttributes();

       // You can use this._ctx here to access current Web Part context
       const customComponent = <PersonComponent {...props}/>;
       ReactDOM.render(customComponent, this);
    }    
}