import * as React from 'react';
import * as styles from './RegisterComponent.module.scss';
import * as strings from 'MTWExtensibilityLibraryStrings';
import { IRegisterComponentProps } from './IRegisterComponentProps';
import { IRegisterComponentState } from './IRegisterComponentState';
import { Spinner } from '@fluentui/react/lib/Spinner';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Callout } from '@fluentui/react/lib/Callout';
import { Text } from '@fluentui/react/lib/Text';
import { Guid } from '@microsoft/sp-core-library';
import { convertToClassName } from '../../../../helper/CssHelper';
import { IIconProps } from '@fluentui/react/lib/Icon';
import { IFlowResult } from '../../../../models/IFlowResult';
import FlowService from '../../../../service/FlowService';


interface IIsUserRegisteredFlowRequest {
    userid:string;
    sessionid:number;
}

interface IRegisterFlowRequest {
    userid:string;
    sessionid:number;
}

interface IRegisterFlowResponse extends IFlowResult {
    id:number;
}

interface IUnregisterFlowRequest {
    id:number;
}

export class RegisterComponent extends React.Component<IRegisterComponentProps, IRegisterComponentState> {

    private _flow: FlowService;
    private _registerIcon: IIconProps = { iconName: 'CircleAdditionSolid' };
    private _unregisterIcon: IIconProps = { iconName: 'Delete' };

    constructor(props: IRegisterComponentProps) {
        super(props);
        this.state = {
            checkingStatus: true,
            changingRegistration: false,
            changedRegistration: false,
            error:false,
            registered: false,
            progressMessage:"",
            changedMessage:"",
            calloutTarget: "a" + Guid.newGuid().toString().replace("-","")
        };
        this._flow = new FlowService(this.props.serviceScope);
    }

    public render() {

        const className = convertToClassName(this.props.className);
        const backClassName: string = className + "-back";

        let content: JSX.Element;

        if(this.state.checkingStatus) {
            content = <div className={styles.default.registerSpinner + " " + backClassName}><Spinner className={styles.default.spinner}></Spinner><Text variant={"medium"}>{strings.WebComponents.Register.CheckingRegistration}</Text></div>;
        } else if (this.state.changingRegistration) {
            content = <div className={styles.default.registerSpinner + " " + backClassName}><Spinner className={styles.default.spinner}></Spinner><Text variant={"medium"}>{this.state.progressMessage}</Text></div>;
        } else if (this.state.registered) {
            content = <PrimaryButton id={this.state.calloutTarget} className={styles.default.registerButton + " " + backClassName} iconProps={this._unregisterIcon} allowDisabledFocus onClick={this._unregister.bind(this)}>{strings.WebComponents.Register.Unregister}</PrimaryButton>;
        } else {
            content = <PrimaryButton id={this.state.calloutTarget} className={styles.default.registerButton + " " + backClassName} iconProps={this._registerIcon} allowDisabledFocus onClick={this._register.bind(this)}>{strings.WebComponents.Register.Register}</PrimaryButton>;
        }

        return <div className={styles.default.register}>
            {content}
            {this._renderCallout()}
        </div>;

    }

    public componentDidMount() {
        this._checkRegistration();
    }

    private async _checkRegistration() : Promise<void> {

        const checkRequest : IIsUserRegisteredFlowRequest = {
            userid : this.props.userId,
            sessionid: parseInt(this.props.sessionId.toString())
        };

        const res:IFlowResult = await this._flow.runFlow(this.props.checkStatusEndpoint, checkRequest);
        if(res.success && res.status === "REGISTERED") {
            const regResponse = res as IRegisterFlowResponse;
            this.setState({
                checkingStatus: false,
                registered: true,
                registrationId: regResponse.id
            });
        } else {
            this.setState({
                checkingStatus: false,
                registered: false,
                registrationId: -1
            });
        }
        
    }

    private async _register() : Promise<void> {
        
        this.setState({
            changingRegistration: true,
            progressMessage: strings.WebComponents.Register.Registering
        });

        const registerRequest : IRegisterFlowRequest = {
            userid : this.props.userId,
            sessionid: parseInt(this.props.sessionId.toString())
        };

        const res:IFlowResult = await this._flow.runFlow(this.props.registerEndpoint, registerRequest);
        const regResponse = res as IRegisterFlowResponse;
        const uiMsg = this.getMessageForResponseCode(res.status);
        const message = !res.success
                ? (uiMsg === res.status) ? "Failure registering for session, please retry (" + uiMsg + ")" : uiMsg
                : uiMsg;    

        this.setState({
            progressMessage: "",
            registered: res.status === "REGISTERED",
            changingRegistration: false,
            changedRegistration: true,
            changedMessage: message,
            error: !res.success,
            registrationId: regResponse.id
        });

    }

    private async _unregister() : Promise<void> {

        this.setState({
            changingRegistration: true,
            progressMessage: strings.WebComponents.Register.Unregistering
        });

        const unregisterRequest : IUnregisterFlowRequest = {
            id: parseInt(this.state.registrationId.toString())
        };

        const res:IFlowResult = await this._flow.runFlow(this.props.unregisterEndpoint, unregisterRequest);

        const uiMsg = this.getMessageForResponseCode(res.status);
        const message = !res.success
                ? (uiMsg === res.status) ? "Failure registering for session, please retry (" + uiMsg + ")" : uiMsg
                : uiMsg;

        this.setState({
            progressMessage: "",
            registered: !(res.status === "UNREGISTERED"),
            changingRegistration: false,
            changedRegistration: true,
            changedMessage: message,
            error: !res.success,
            registrationId: null
        });

    }

    private _renderCallout() : JSX.Element {
        return this.state.changedRegistration
            ? <Callout
                className={styles.default.callout}
                role="alertdialog"
                gapSpace={0}
                target={"#" + this.state.calloutTarget}
                onDismiss={()=>{
                    this.setState({
                        changedRegistration: false,
                        changedMessage: "",
                        error:false
                    });
                }}
                setInitialFocus>
                    <Text variant={'smallPlus'} className={styles.default.sharingInfoText}>{this.state.changedMessage}</Text>
                </Callout>
            : null;
    }

    private getMessageForResponseCode(code:string):string {
        const responseCodes = strings.WebComponents.Register.Codes;
        const message = responseCodes[code];
        return message ? message : code;  
    }

}