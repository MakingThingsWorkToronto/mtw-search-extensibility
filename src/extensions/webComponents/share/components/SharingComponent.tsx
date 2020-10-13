import * as React from 'react';
import * as styles from './SharingComponent.module.scss';
import * as strings from 'MTWExtensibilityLibraryStrings';
import { IIconProps, Icon } from '@fluentui/react/lib/Icon';
import { IconButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Callout } from '@fluentui/react/lib/Callout';
import { ISharingComponentProps } from './ISharingComponentProps';
import { ISharingComponentState } from './ISharingComponentState';
import { Text } from '@fluentui/react/lib/Text';
import { TextField } from '@fluentui/react/lib/TextField';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { convertToClassName } from '../../../../helper/CssHelper';
import { Guid } from '@microsoft/sp-core-library';

export class SharingComponent extends React.Component<ISharingComponentProps, ISharingComponentState> {
    
    private _shareIcon: IIconProps = { iconName: 'Share' };

    constructor(props: ISharingComponentProps) {
        super(props);
        this.state = {
            sharingLink: this.props.hyperlink
                ? this.props.hyperlink
                : window.location.href,
            showSharingLink: false,
            copiedToClipboard: false,
            calloutTarget: "a" + Guid.newGuid().toString().replace("-","")
        };
    }
            
    public render() {

        const className = convertToClassName(this.props.className);
        const backClassName: string = className + "-back";
        const foreClassName: string = className + "-fore";
        const borderClassName: string = className + "-border";

        const button = (this.props.compact === false)
            ? <PrimaryButton id={this.state.calloutTarget} className={styles.default.sharingButton + " " + backClassName} iconProps={this._shareIcon} allowDisabledFocus onClick={this._shareLink.bind(this)}>{strings.Extensions.Share.ShareButtonText}</PrimaryButton>
            : <IconButton id={this.state.calloutTarget} className={styles.default.sharingButtonCompact + " " + backClassName} iconProps={this._shareIcon} allowDisabledFocus onClick={this._shareLink.bind(this)}></IconButton>;

        return <div className={styles.default.sharing}>
                    {button}
                    {this._renderCallout(foreClassName, backClassName, borderClassName)}
                </div>;

    }

    private _shareLink() : void {
        this.setState({
            showSharingLink: true
        });
    }

    private _renderCallout(foreClassName: string, backClassName: string, borderClassName: string) : JSX.Element {
        return this.state.showSharingLink 
            ? <Callout
                className={styles.default.callout}
                role="alertdialog"
                gapSpace={0}
                target={"#" + this.state.calloutTarget}
                onDismiss={()=>{
                    this.setState({
                        showSharingLink: false
                    });
                }}
                setInitialFocus>
                    {this.state.copiedToClipboard
                        ? <div className={styles.default.clipboard}>
                            <Icon iconName="SkypeCircleCheck" className={styles.default.icon + " " + foreClassName}></Icon>
                                <Text variant={'large'} className={styles.default.clipboardText}>{strings.Extensions.Share.CopiedClipboard}</Text>
                            
                          </div>
                        : null
                    }
                    <CopyToClipboard text={this.state.sharingLink} onCopy={() => {this.setState({copiedToClipboard: true});}}>
                        <TextField className={styles.default.linkText + " " + borderClassName} suffix={strings.Extensions.Share.CopyText} value={this.state.sharingLink}></TextField>  
                    </CopyToClipboard>
                    <Text variant={'smallPlus'} className={styles.default.sharingInfoText}>{strings.Extensions.Share.ShareText}</Text>
                </Callout>
            : null;
    }

}