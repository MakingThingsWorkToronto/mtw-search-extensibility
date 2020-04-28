import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from '../../models/BaseWebComponent';
import { IconButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
import styles from './TagsComponent.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { values, initializeIcons, Label } from 'office-ui-fabric-react';



export interface ITagsComponentProps {

    /**
     * Title of the pop out panel
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
     * The icon to display to the left of the list of tags
     */
    icon?:string;

}

export interface ITagsComponentState {
    show?: boolean;
}

export interface ITagsItems {
    items : IOverflowSetItemProps[];
    overflowItems : IOverflowSetItemProps[];
}

export class TagsComponent extends React.Component<ITagsComponentProps, ITagsComponentState> {
    
    private DEFAULT_ITEMS : number = 5;
    
    constructor(props: ITagsComponentProps) {
        super(props);
    }
    
    protected async onInit(): Promise<void> {
        initializeIcons();
    }
        
    public render() {

        const items = this.getItems();
        
        if(!items) {
            return "";
        }

        if(this.props.title && this.props.title.length > 0) {
            items.items.unshift({
                key: "tagLabel", 
                name: this.props.title
            });
        }

        if(this.props.icon && this.props.icon.trim().length>0)
            items.items.unshift({
                key:"tagIcon", 
                name: this.props.icon
            });
        
        return <div className={styles.tagsComponent}>
            <OverflowSet
                className={styles.tags}
                role="List"
                items={items.items}
                overflowItems={items.overflowItems}
                onRenderOverflowButton={this.onRenderOverflowButton.bind(this)}
                onRenderItem={this.onRenderItem.bind(this)} />
        </div>;

    }

    private getItems() : ITagsItems {
        
        let items : IOverflowSetItemProps[] = [];
        let overflowItems : IOverflowSetItemProps[] = [];
        let nbrItems = (!this.props.nbrItems || this.props.nbrItems.trim().length <= 0) ? this.DEFAULT_ITEMS : parseInt(this.props.nbrItems);
        let fieldValue = this.props.value ? this.props.value.trim() : "";

        if(nbrItems == NaN) {
            console.log("pnp-tags-component: The nbrItems property must be a whole number. No valid number found. Cannot render control due to configuration error. The property should be set using the following format nbritems=\"2\".");
            return;
        }

        // if there is no value specified
        if(fieldValue.length == 0) {
            return;
        }
        
        if(fieldValue.indexOf("L0|#")>-1) {
            
            // treat this as a non-localized field
            const allItems = fieldValue.split("L0|#");
            let allTags : any[] = [];

            allItems.forEach((value,index)=>{
                
                if(value && value.trim().length>0) {
                    
                    const itemParts = value.split("|");

                    allTags.push({
                        id: itemParts[0].trim(),
                        label: itemParts[1].trim()
                    });
                }

            });

            allTags.forEach((value, index) => {
                let newItem = { key: 'item' + index, name: value.label.trim(), onClick: this.tagClicked.bind(this, value.label, value.id) };
                (index >= nbrItems) ? overflowItems.push(newItem) : items.push(newItem);
            });

        } else {
            
            // treat this as a localized field
            const allItems = fieldValue.split(",");
            allItems.forEach((value,index)=>{
                let newItem = { key: 'item' + index, name: value.trim(), onClick: this.tagClicked.bind(this, value, "") };
                (index >= nbrItems) ? overflowItems.push(newItem) : items.push(newItem);
            });

        }

        return { items: items, overflowItems: overflowItems };

    }

    private onRenderItem(item: IOverflowSetItemProps) :JSX.Element {
        if(item.key == "tagIcon") {
            return <Icon iconName={item.name} className={styles.tagsIcon} />;
        } else if (item.key == "tagLabel") {
            return <Label title={this.props.title} className={styles.tagsLabel}>{this.props.title}</Label>;
        } else {
            var text = item.name.replace("＆","&");
            return <Link role="menuitem" className={styles.tagsLink} title={text} onClick={item.onClick}>{text}</Link>;
        }
    }
      
    private onRenderOverflowButton(overflowItems: any[] | undefined): JSX.Element {
        
        return (
            <IconButton
                role="img"
                title="More options"
                className={styles.overflowButton}
                menuIconProps={{ iconName: 'ChevronDownMed' }}
                menuProps={{ items: overflowItems! }}
            />
        );
    }
    
    private tagClicked():void {

    }

}

export class TagsComponentWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
       let props = this.resolveAttributes();

       // You can use this._ctx here to access current Web Part context
       const customComponent = <TagsComponent {...props}/>;
       ReactDOM.render(customComponent, this);
    }    
}