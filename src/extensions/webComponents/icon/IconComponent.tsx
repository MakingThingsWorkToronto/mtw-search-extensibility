import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from '@pnp/modern-search-extensibility';
import styles from './IconComponent.module.scss';
import { Icon } from '@fluentui/react/lib/Icon';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Label } from '@fluentui/react/lib/Label';



export interface IIconComponentProps {

    /**
     * The label to display before the link
     */
    title?:string;

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
    
    public componentDidMount() {        
        initializeIcons();
    }
        
    public render() {

        const value = this.getValue();
        let icon: JSX.Element = null;
        let titleJSX: JSX.Element = null;

        if(!value) return "";
        
        if(this.props.icon && this.props.icon.trim().length > 0) icon = <Icon iconName={this.props.icon.trim()} className={styles.icon} />;
        
        if(this.props.title && this.props.title.trim().length > 0) titleJSX = <Label className={styles.iconLabel} title={this.props.title}>{this.props.title}</Label>;

        return <div className={styles.iconComponent}>
            {icon}{titleJSX}
            <Label className={styles.iconLabel} title={value}>{value}</Label>
        </div>;

    }

    private getValue() : string {
        
        return (this.props.value && this.props.value.length>0)  ? this.props.value.trim() : null;

    }

}

export class IconWebComponent extends BaseWebComponent {
   
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