import * as React from 'react';
import * as styles from './StarComponent.module.scss';
import { Icon } from '@fluentui/react/lib/Icon';
import { IStarComponentProps } from './IStarComponentProps';
import { IStarComponentState } from './IStarComponentState';

export class StarComponent extends React.Component<IStarComponentProps, IStarComponentState> {

    constructor(props: IStarComponentProps) {
        super(props);
        this.state = {
            backgroundClass: ""
        };
    }
    
    public async componentDidMount(){
        const c = await this._getBgClass();
        this.setState({
            backgroundClass: c
        });
    }

    public render() {
        
        if(this.props.showStar && this.props.showStar === "1"){

            const iconName : string = this.props.icon ? this.props.icon : "FavoriteStarFill";
            const addClasses: string = (this.props.className ? this.props.className : "")
                    + " " + this.state.backgroundClass;

            return <div className={styles.default.starComponent + " " + addClasses}>
                <Icon iconName={iconName}></Icon>
            </div>;

        }

        return null;

    }

    private _getBgClass():Promise<string> {
        return new Promise((resolve,reject)=> {
            const interval = window.setInterval(()=>{
                if((window as any).cleBack) {
                    window.clearTimeout(interval);
                    resolve((window as any).cleBack);
                }
            }, 500);
        });
    }

}