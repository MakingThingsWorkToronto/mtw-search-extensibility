import * as React from 'react';
import * as styles from './PageHeaderComponent.module.scss';
import { Text } from '@fluentui/react/lib/Text';
import { Icon } from '@fluentui/react/lib/Icon';
import { IPageHeaderComponentProps } from './IPageHeaderComponentProps';
import { IPageHeaderComponentState } from './IPageHeaderComponentState';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { convertToClassName } from '../../../../helper/CssHelper';

export class PageHeaderComponent extends React.Component<IPageHeaderComponentProps, IPageHeaderComponentState> {
    
    constructor(props: IPageHeaderComponentProps) {
        super(props);
    }

    public componentWillMount() {
        if(this.props.stylesheet && this.props.stylesheet.length>0) {
            SPComponentLoader.loadCss(this.props.stylesheet);
        }
    }
        
    public render() {
        
        const selector: string = this.props.headerSelector ? this.props.headerSelector : "div[data-automation-id=pageHeader]";
        this.ootbHeaderDisplay(document.querySelectorAll(selector),"none");
        document.title = this.props.titleText;

        const cssClassPrefix = convertToClassName(this.props.colorBarText);
        const iconCircleCssClass = cssClassPrefix + "-icon-circle";
        const iconColorBarCssClass = cssClassPrefix + "-back";

        let bgImage = {};

        (window as any).cleBack = iconColorBarCssClass;
        
        if(this.props.headerImage && this.props.headerImage.length > 0) {
            bgImage = {
                backgroundImage: `url(${this.props.headerImage})`
            };
        }

        return <div className={styles.default.pageHeader}>
            <div className={styles.default.headerImage} style={bgImage}>
            </div>
            <div className={styles.default.headerBar}>
                <div className={styles.default.headerColorBar + " " + iconColorBarCssClass}>
                    <Text variant={'medium'}>{this.props.colorBarText}</Text>
                </div>
                <div className={styles.default.headerContents}>
                    <div className={styles.default.iconBox}>
                        <div className={styles.default.iconCircle + " " + iconCircleCssClass}></div>
                    </div>
                    <div className={styles.default.textBox}>
                        <Text variant={'xxLarge'} className={styles.default.titleText}>{this.props.titleText}</Text>
                        <div className={styles.default.presenters}>
                            <Icon iconName="People" style={{width: "20px", height:"20px"}}></Icon>
                            <Text variant={'medium'}>{this.props.presenterText}</Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>;

    }

    private ootbHeaderDisplay(elements:NodeListOf<Element>, display){
        if(elements && elements.length > 0) {
            elements.forEach((el)=>{
                (el as HTMLElement).style.display = display;
            });
        }
    }

}