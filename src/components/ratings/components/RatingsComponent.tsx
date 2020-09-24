import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './RatingsComponent.module.scss';
import * as strings from 'MTWExtensibilityLibraryStrings';
import { Rating, RatingSize } from '@fluentui/react/lib/Rating';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { IRatingsComponentProps } from './IRatingsComponentProps';
import { IRatingsComponentState } from './IRatingsComponentState';
import { convertToClassName } from '../../../helper/CssHelper';
import FlowService from '../../../service/FlowService';
import { IFlowResult } from '../../../models/IFlowResult';
import { Callout } from '@fluentui/react/lib/Callout';
import { Text } from '@fluentui/react/lib/Text';
import { Guid } from '@microsoft/sp-core-library';

interface IRatingFlowResult extends IFlowResult {
    newrating: number;
}

interface IRatingFlowRequest {
    user: string;
    siteUrl: string;
    listId: string;
    listItemId: number;
    rating: number;
}

export class RatingsComponent extends React.Component<IRatingsComponentProps, IRatingsComponentState> {
    
    private flow: FlowService = null;

    constructor(props: IRatingsComponentProps) {
        super(props);

        this.state = {
            rating : props.rating === undefined ? 0 : parseInt(props.rating.toString()) ,
            settingRating: false,
            message: null,
            error:false,
            calloutTarget: "a" + Guid.newGuid().toString().replace("-","")
        };
        
        this.flow = new FlowService(this.props.context.webPart);

    }
            
    public render() {

        const prefixClass = convertToClassName(this.props.className);
        const backClassName: string = prefixClass + "-back";

        return <div id={this.state.calloutTarget} className={styles.default.ratingComponent + " " + backClassName}>
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
            {this.renderCallout()}
        </div>;

    }

    private renderCallout() : JSX.Element {
        
        if(this.state.message && this.state.message.length > 0) {

        const calloutClassName = this.state.error
                ? styles.default.callout + " " + styles.default.error
                : styles.default.callout;

        return <Callout
                className={calloutClassName}
                role="alertdialog"
                gapSpace={0}
                target={"#" + this.state.calloutTarget}
                onDismiss={()=>{
                    this.setState({
                        error: false,
                        message: ""
                    });
                }}
                setInitialFocus
                >
                <Text variant={'medium'}>{this.state.message}</Text>
            </Callout>;

        } else {

            return null;
        }
        
    }

    private async ratingChanged(ev: React.FocusEvent<HTMLElement>, rating: number): Promise<void> {
        
        const ratingRequest: IRatingFlowRequest = {
            user: this.props.user,
            siteUrl: this.props.siteUrl,
            listId: this.props.listId,
            listItemId: typeof this.props.itemId === "number" ? this.props.itemId : parseInt(this.props.itemId),
            rating: rating
        };

        this.setState({settingRating: true, error: false, message: null});
         
        const res : IFlowResult = await this.flow.runFlow(this.props.rateEndpoint, ratingRequest);

        const ratingResult = res as IRatingFlowResult;
        
        const uiMessage = this.getMessageForResponseCode(res.status);
        const message = !res.success 
                ? (uiMessage === res.status) ? "Failure setting rating, please retry (" + uiMessage + ")" : uiMessage
                : uiMessage;
  
        this.setState({
            settingRating: false, 
            error: !res.success, 
            message: message,
            rating: res.success === true && typeof ratingResult.newrating === "number" ? ratingResult.newrating : this.state.rating
        });
    
    }

    private getRatingComponentAriaLabel(rating: number, maxRating: number) : string {
        return `Rating value is ${rating} of ${maxRating}`;
    }

    private getMessageForResponseCode(responseCode:string):string {
        const responseCodes = strings.Extensions.Ratings.ResponseCodes;
        const message = responseCodes[responseCode];
        return message ? message : responseCode;
    }

}