import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from '@pnp/modern-search-extensibility';
import styles from './BlockComponent.module.scss';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Label, TooltipHost } from '@microsoft/office-ui-fabric-react-bundle';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { SharePointService } from '../../../service/SharePointService';
import { ServiceScope } from '@microsoft/sp-core-library';

export interface IBlockComponentProps {

    /**
     * The URL of the web we should connect to for the data
     */
    
    webURL?: string;

    /**
     * The list ID of the list we should connect to for the data
     */
    listID?: string;

    /**
     * The list item ID of the item we should connect to for the data
     */
    listItemID?: number;

    /**
     * The column name we should pull data for
     */
    columnName?: string;

    /**
     * The service scope for the request
     */
    serviceScope?: ServiceScope;
}

export interface IBlockComponentState {
    loading: boolean;
    value?: string;
}

export class BlockComponent extends React.Component<IBlockComponentProps, IBlockComponentState> {
    
    constructor(props: IBlockComponentProps) {
        super(props);
        this.state = {
            loading : true
        };
    }
    
    public componentDidMount(){        
        initializeIcons();
    }
        
    public render() {

        let body: JSX.Element = null;
        if(this.state.loading) {
            body = <div dangerouslySetInnerHTML={this.getValue()} />;
        } else {
            body = <div>
                <Spinner size={SpinnerSize.small} />
                <Label>Loading Data...</Label>
            </div>;
        }
        
        return <div className={styles.blockComponent}>
            {body}    
        </div>;

    }

    private getValue() {
        return { __html: this.state.value };
    }

    private async getFieldValue() {
        
        var svc = new SharePointService(this.props.serviceScope);
        
        var value = await svc.getFieldValue(this.props.webURL, this.props.listID, this.props.listItemID, this.props.columnName);

        this.setState({
            loading: false,
            value: value
        });

    }

}

export class BlockWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
       let props = this.resolveAttributes();
       props.serviceScope = this._serviceScope;

       // You can use this._ctx here to access current Web Part context
       const customComponent = <BlockComponent {...props}/>;
       ReactDOM.render(customComponent, this);
    }    
}