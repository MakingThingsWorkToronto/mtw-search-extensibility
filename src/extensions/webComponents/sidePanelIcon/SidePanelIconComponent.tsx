import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from '@pnp/modern-search-extensibility';
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import styles from './SidePanelIconComponent.module.scss';
import { Icon } from '@fluentui/react/lib/Icon';
import { IconButton } from '@fluentui/react/lib/Button';
import { TooltipHost, ITooltipHostStyles } from '@fluentui/react/lib/Tooltip';

export interface ISidePanelIconComponentProps {

    /**
     * Title of the pop out panel
     */
    title?:string;

    /**
     * Icon to display as the link
     */
    icon?:string;

    /**
     * The URL to the view form
     */
    url?: string;

    /**
     * The size of the panel
     */
    size?:string;

    /**
     * The position of the panel
     */
    position?:string;

    /**
     * Link class name
     */
    linkClassName?:string;

}

export interface ISidePanelIconComponentState {
    showPanel: boolean;
}

export interface ISidePanelIconComponentTypeSize {
    Type: PanelType;
    Size: string;
}

export class SidePanelIconComponent extends React.Component<ISidePanelIconComponentProps, ISidePanelIconComponentState> {
    
    constructor(props: ISidePanelIconComponentProps) {
        super(props);
        this.state = {
            showPanel: false
        };
    }

    private getIconButton() :JSX.Element {
        
        const title = this.props.title ? this.props.title : "";
        const icon = {iconName: this.props.icon};
        const button = <IconButton iconProps={icon} aria-label={title} onClick={(e) => { this.setState({ showPanel: true }); }} className={this.props.linkClassName} />;
        const calloutProps = { gapSpace: 0 };
        const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };

        if(this.props.title) {
            return <TooltipHost
                    content={this.props.title}        
                    calloutProps={calloutProps}
                    styles={hostStyles}
                    setAriaDescribedBy={false}
                    >
                    {button}
                </TooltipHost>;
        } else {
            return button;
        }
    }

    public render() {
        const currentDomain = window.location.protocol + "//" + window.location.host;
        const sameDomain = this.props.url && this.props.url.length > 0 
                                ? this.props.url.indexOf(currentDomain) == 0 || this.props.url.indexOf("/") == 0
                                : false;
        const panelTypeSize = this.getPanelTypeSize();

        return <div className={styles.sidePanelLink}>
            {sameDomain 
                ? this.getIconButton()
                : <a href={this.props.url} target="_blank" data-interception="off" className={this.props.linkClassName}><Icon iconName={this.props.icon} /></a>}
            
            <Panel
                headerText={this.props.title}
                isOpen={this.state.showPanel}
                type={panelTypeSize.Type}
                isLightDismiss={true}
                customWidth={panelTypeSize.Size}
                onDismiss={() => {
                    this.setState({
                        showPanel: false
                    });
                }}
                className={styles.sidePanelComponent}
                closeButtonAriaLabel="Close"
            >
                <iframe width="100%" src={this.props.url}></iframe>

            </Panel>
        </div>;
    }

    private getPanelTypeSize(): ISidePanelIconComponentTypeSize {

        let panelType : PanelType = null;
        let size: string = null;

        switch (this.props.position) {
            case "custom": {
                panelType = PanelType.custom;
                size = this.props.size;
                break;
            } 
            case "customNear" : {
                panelType = PanelType.customNear;
                size = this.props.size;
                break;
            }
            case "extraLarge": {
                panelType = PanelType.extraLarge;
                break;
            }
            case "large": {
                panelType = PanelType.large;
                break;
            }
            case "largeFixed" : {
                panelType = PanelType.largeFixed;
                break;
            }
            case "medium" : {
                panelType = PanelType.medium;
                break;
            }
            case "smallFixedFar" : {
                panelType = PanelType.smallFixedFar;
                break;
            }
            case "smallFixedNear":{
                panelType = PanelType.smallFixedNear;
                break;
            }
            case "smallFluid" : {
                panelType = PanelType.smallFluid;
                break;
            }
            default: {
                panelType = PanelType.medium;
                break;
            }
        }
        
        return {
            Type : panelType,
            Size: size
        };

    }
}

export class SidePanelIconWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
       let props = this.resolveAttributes();

       // You can use this._ctx here to access current Web Part context
       const customComponent = <SidePanelIconComponent {...props}/>;
       ReactDOM.render(customComponent, this);
    }    
}