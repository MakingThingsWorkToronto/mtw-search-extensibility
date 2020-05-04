import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from '../../models/BaseWebComponent';
import { IconButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
import styles from './TagsComponent.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { values, initializeIcons, Label } from 'office-ui-fabric-react';
import { SearchHelper } from '../../helper/SearchHelper';
import { UrlHelper } from '../../helper/UrlHelper';
import { IRefinementFilter, IRefinementValue, RefinementOperator } from "../../models/ISearchResult";
import { cloneDeep } from '@microsoft/sp-lodash-subset';

export interface ITagsComponentProps {

    /**
     * Title of the pop out panel
     */
    value?:string;

    /**
     * Filter managed property name
     */
    filterProperty?:string;

    /**
     * Filter operator
     */
    filterOperator?:string;

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
    private _currentFilters : IRefinementFilter[] = [];
    
    constructor(props: ITagsComponentProps) {
        super(props);
    }
    
    protected async onInit(): Promise<void> {
        initializeIcons();
        this._currentFilters = SearchHelper.getRefinementFiltersFromUrl();
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
                onRenderItem={this.onRenderItem.bind(this)}
                />
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
        
        // if this is a raw taxonomy field
        if(fieldValue.indexOf("L0|#")>-1) {
            
            const allParts = fieldValue.split(";");
            let allTags : any[] = [];

            allParts.forEach((value)=>{

                let parts = value.split("|");
                let typePart = parts[0];
                
                if(typePart == "L0" && parts.length == 3) {

                    allTags.push({
                        id: parts[1].substr(1),
                        label: parts[2]
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
            let text = item.name.replace("＆","&");
            if(this.props.filterProperty) {
                const href = this.buildFilter(item.name);
                return <Link role="menuitem" className={styles.tagsLink} title={text} href={href} data-interception="off">{text}</Link>;
            } else {
                return <Label className={styles.tagsLink} title={text}>{text}</Label>;
            }
        }
    }

    private buildFilter(filterValue:string) : string {
        
        const filterProperty = this.props.filterProperty.trim();
        let filters = cloneDeep(this._currentFilters);
        const filterText = "string('" + filterValue.replace("'","\'") + "')";
        const operator = (this.props.filterOperator && this.props.filterOperator == RefinementOperator.OR)
                            ? RefinementOperator.OR
                            : RefinementOperator.AND;

        const newValue : IRefinementValue = {
            RefinementCount: -1,
            RefinementName: filterText,
            RefinementToken: filterText,
            RefinementValue: filterText,
        };

        if(!filters.some((filter)=>{
                
                if(filter.FilterName == filterProperty) {
                    filter.Values.push(newValue);
                    return true;
                }
                
                return false;

            })) {
            
            filters.push({ FilterName: filterProperty, Operator: operator, Values: [newValue] });

        }

        const filterQueryString = SearchHelper.buildRefinementQueryString(filters);

        return UrlHelper.addOrReplaceQueryStringParam(window.location.href, "filters", filterQueryString);

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
    
    private tagClicked(tag:string,item:any,element:HTMLElement):void {
        if(tag && this.props.filterProperty) {
            const trimTag = tag.trim();
            if(trimTag.length>0) {
                window.location.href = this.buildFilter(tag.trim());
            }
        }
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