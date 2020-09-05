import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from 'search-extensibility';
import { Panel, PanelType, Link } from "office-ui-fabric-react";
import styles from './SidePanelTemplateComponent.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export interface ISidePanelTemplateComponentProps {

    /**
     * Title of the pop out panel
     */
    title?:string;

    /**
     * The size of the panel
     */
    size?:string;

    /**
     * The position of the panel
     */
    position?:string;

    /**
     * The child elements
     */
    children?:string;

}

export interface ISidePanelTemplateComponentState {
    showPanel: boolean;
}

export interface ISidePanelTemplateComponentTypeSize {
    Type: PanelType;
    Size: string;
}

export class SidePanelTemplateComponent extends React.Component<ISidePanelTemplateComponentProps, ISidePanelTemplateComponentState> {
    
    constructor(props: ISidePanelTemplateComponentProps) {
        super(props);
        this.state = {
            showPanel: false
        };
    }

    public render() {
        
        const panelTypeSize = this.getPanelTypeSize();
        
        return <div className={styles.sidePanelLink}>
            <span onClick={(e) => { this.setState({ showPanel: true }); }}>{this.props.title}</span>
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
                <div dangerouslySetInnerHTML={this.createChildren()}></div>

            </Panel>
        </div>;
    }

    private createChildren() {
        return {__html: this.props.children };
    }

    private getPanelTypeSize(): ISidePanelTemplateComponentTypeSize {

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

export class SidePanelTemplateWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
       let props = this.resolveAttributes();
       props.children = this.innerHTML;

       // You can use this._ctx here to access current Web Part context
       const customComponent = <SidePanelTemplateComponent {...props} />;

       ReactDOM.render(customComponent, this);

    }    
}