import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './RatingsComponent.module.scss';
import { Rating, RatingSize } from 'office-ui-fabric-react/lib/Rating';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { IRatingsComponentProps } from './IRatingsComponentProps';
import { IRatingsComponentState } from './IRatingsComponentState';
import { convertToClassName } from '../../../helper/CssHelper';
import FlowService from '../../../service/FlowService';
import { IFlowResult } from '../../../models/IFlowResult';

export class RatingsComponent extends React.Component<IRatingsComponentProps, IRatingsComponentState> {
    
    private flow: FlowService = null;

    constructor(props: IRatingsComponentProps) {
        super(props);

        this.state = {
            rating : props.rating,
            settingRating: false,
            message: null,
            error:false
        };

    }
    
    protected async onInit(): Promise<void> {
        
        // initialize component
        this.flow = new FlowService(this.props.context.webPart);

    }
        
    public render() {

        const prefixClass = convertToClassName(this.props.className);
        const backClassName: string = prefixClass + "-back";
        const foreClassName: string = prefixClass + "-fore";

        return <div className={styles.default.ratingComponent + " " + backClassName}>
            {!this.state.settingRating 
             ? <Rating min={1} max={5}
                size={RatingSize.Small}
                rating={this.state.rating}
                getAriaLabel={this.getRatingComponentAriaLabel}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={this.ratingChanged.bind(this)}
                ariaLabelFormat={'Select {0} of {1} stars'} />
             : <Spinner size={SpinnerSize.small} />
            }
        </div>;

    }

    private async ratingChanged(ev: React.FocusEvent<HTMLElement>, rating: number): Promise<void> {
        
        this.setState({settingRating: true, error: false, message: null});
         
        const res : IFlowResult = await this.flow.runFlow(this.props.rateEndpoint,{
            user: this.props.user,
            siteUrl: this.props.siteUrl,
            listId: this.props.listId,
            listItemId: this.props.itemId,
            rating: rating
        });
                
        this.setState({settingRating: false, error: res.success, message: res.status});
    
    }

    private getRatingComponentAriaLabel(rating: number, maxRating: number) : string {
        return `Rating value is ${rating} of ${maxRating}`;
    }

}