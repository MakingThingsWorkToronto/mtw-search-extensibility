import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from '../../models/BaseWebComponent';
import { IconButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
import styles from './IconComponent.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { values, initializeIcons, Label } from 'office-ui-fabric-react';



export interface IIconComponentProps {

    /**
     * Field value 
     */
    value?:string;
    
    /** 
     * The icon to display to the left of the field value
     */
    icon?:string;

}

export interface IIconComponentState {
    show?: boolean;
}

export class IconComponent extends React.Component<IIconComponentProps, IIconComponentState> {
    
    constructor(props: IIconComponentProps) {
        super(props);
    }
    
    protected async onInit(): Promise<void> {
        initializeIcons();
    }
        
    public render() {

        const value = this.getValue();
        let icon: JSX.Element = null;

        if(!value) return "";
        
        if(this.props.icon && this.props.icon.trim().length>0) icon = <Icon iconName={this.props.icon.trim()} className={styles.icon} />;
        
        return <div className={styles.iconComponent}>
            {icon}
            <Label className={styles.iconLabel} title={value}>{value}</Label>
        </div>;

    }

    private getValue() : string {
        
        return (this.props.value && this.props.value.length>0)  ? this.props.value.trim() : null;

    }

}

export class IconComponentWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
       let props = this.resolveAttributes();

       // You can use this._ctx here to access current Web Part context
       const customComponent = <IconComponent {...props}/>;
       ReactDOM.render(customComponent, this);
    }    
}