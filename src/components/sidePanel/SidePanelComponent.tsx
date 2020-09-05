import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from 'search-extensibility';
import { Panel, PanelType, Link } from "office-ui-fabric-react";
import styles from './SidePanelComponent.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export interface ISidePanelComponentProps {

    /**
     * Title of the pop out panel
     */
    title?:string;

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
     * Determines if we should show open link in new window option
     */
    newWindow?:boolean;

}

export interface ISidePanelComponentState {
    showPanel: boolean;
}

export interface ISidePanelComponentTypeSize {
    Type: PanelType;
    Size: string;
}

export class SidePanelComponent extends React.Component<ISidePanelComponentProps, ISidePanelComponentState> {
    
    constructor(props: ISidePanelComponentProps) {
        super(props);
        this.state = {
            showPanel: false
        };
    }

    public render() {
        const currentDomain = window.location.protocol + "//" + window.location.host;
        const sameDomain = this.props.url && this.props.url.length > 0 
                                ? this.props.url.indexOf(currentDomain) == 0
                                : false;
        const panelTypeSize = this.getPanelTypeSize();
        const openInNewWindow = this.props.newWindow === true
                        ? <a href={this.props.url} className={styles.openInNewWindow} target="_blank" data-interception="off"><Icon iconName='OpenInNewTab' /></a> 
                        : null;

        return <div className={styles.sidePanelLink}>
            {openInNewWindow}
            {sameDomain 
                ? <span onClick={(e) => { this.setState({ showPanel: true }); }}>{this.props.title}</span>
                : <a href={this.props.url} target="_blank" data-interception="off">{this.props.title}</a>}
            
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

    private getPanelTypeSize(): ISidePanelComponentTypeSize {

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

export class SidePanelWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
       let props = this.resolveAttributes();

       // You can use this._ctx here to access current Web Part context
       const customComponent = <SidePanelComponent {...props}/>;
       ReactDOM.render(customComponent, this);
    }    
}