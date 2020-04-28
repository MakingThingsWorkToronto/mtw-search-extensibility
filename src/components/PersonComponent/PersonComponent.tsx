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
     * The number of items we should display before overflowing.
     */
    nbrItems?:string;

    /**
     * The label to display before the list of tags, empty string to display no text
     */
    title?:string;

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

export interface IPersonItem extends IOverflowSetItemProps {
    name?:string;
    email?:string;
    userId?:string;
    account?:string;
    delveUrl?:string;
    mailTo?:string;
}

export interface IPeopleItems {
    items : IOverflowSetItemProps[];
    overflowItems : IOverflowSetItemProps[];
}

export class PersonComponent extends React.Component<IPersonComponentProps, IPersonComponentState> {
    
    private DEFAULT_ITEMS : number = 5;

    constructor(props: IPersonComponentProps) {
        super(props);
    }
    
    protected async onInit(): Promise<void> {
        initializeIcons();
    }
        
    public render() {

        const people = this.getPeople();
        let icon: JSX.Element = null;

        if(!people) return "";
        
        if(this.props.title && this.props.title.length > 0) {
            people.items.unshift({
                key: "personLabel", 
                name: this.props.title
            });
        }

        if(this.props.icon && this.props.icon.trim().length>0) {
            people.items.unshift({
                key:"personIcon", 
                name: this.props.icon
            });
        }

        return <div className={styles.personComponent}>
            <OverflowSet
                className={styles.people}
                role="List"
                items={people.items}
                overflowItems={people.overflowItems}
                onRenderOverflowButton={this.onRenderOverflowButton.bind(this)}
                onRenderItem={this.onRenderItem.bind(this)} />
        </div>;
 
    }

    private getPeople() : IPeopleItems {
        
        let fieldValue = this.props.value ? this.props.value.trim() : "";

        if(!fieldValue || fieldValue.trim().length==0) return;
        
        let items : IOverflowSetItemProps[] = [];
        let overflowItems : IOverflowSetItemProps[] = [];
        let nbrItems = (!this.props.nbrItems || this.props.nbrItems.trim().length <= 0) ? this.DEFAULT_ITEMS : parseInt(this.props.nbrItems);
        let users : IPersonItem[] = [];
        const usersParts = fieldValue.split(" | ");
        let blank = 0;
        let newUser: IPersonItem = { key: "", name: "" };

        usersParts.forEach((value,index)=>{
            if (blank == 0) {
                newUser.email = this.getPart(value);
            } else if (blank == 1) {
                newUser.name = this.getPart(value);
            } else if (blank == 2){
                let userParts = value.split(" ");
                if(userParts.length >= 2) {
                    newUser.userId = this.getPart(userParts[0]);
                    newUser.account = this.getPart(userParts[1]);
                    newUser.mailTo = "mailto:" + newUser.email;
                    newUser.key = newUser.account + newUser.userId;
                    newUser.delveUrl = (newUser.account.indexOf("i:0#.f|membership|") > -1) 
                        ? (window.location.protocol + "//" + window.location.host).replace(".sharepoint.com","-my.sharepoint.com")
                                            + "/PersonImmersive.aspx?accountname=" + encodeURIComponent(newUser.account)
                        : newUser.mailTo;
                    users.push(newUser);
                }
                if(userParts.length == 3) {    
                    newUser = { key: "", name: "" };
                    newUser.email = this.getPart(value);
                    blank = 0;
                }                
            }
            blank++;
        });

        users.forEach((person,index)=>{
            (index >= nbrItems) ? overflowItems.push(person) : items.push(person);
        });

        return {
            items: items,
            overflowItems: overflowItems
        };

    }

    private getPart(value:string) {
        if(value && value.length > 0) return value.trim();
    }

    private onRenderItem(item: IOverflowSetItemProps) :JSX.Element {
        if(item.key == "personIcon") {
            return <Icon iconName={item.name} className={styles.personIcon} />;
        } else if (item.key == "personLabel") {
            return <Label title={this.props.title} className={styles.personLabel}>{this.props.title}</Label>;
        } else {
            var person = item as IPersonItem;
            var link = this.props.linkType == "delve" ? person.delveUrl : "mailto:" + person.email;
            return <Link role="menuitem" className={styles.personLink} title={person.name} href={link} target="_blank" data-interception="off">{person.name}</Link>;
        }
    }
      
    private onRenderOverflowButton(overflowItems: any[] | undefined): JSX.Element {
        
        return (
            <IconButton
                role="img"
                title="More options"
                className={styles.peopleOverflowButton}
                menuIconProps={{ iconName: 'ChevronDownMed' }}
                menuProps={{ items: overflowItems! }}
            />
        );
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