import * as React from 'react';
import * as styles from './StreamComponent.module.scss';
import { IStreamComponentProps } from './IStreamComponentProps';
import { IStreamComponentState } from './IStreamComponentState';

export class StreamComponent extends React.Component<IStreamComponentProps, IStreamComponentState> {
    
    constructor(props: IStreamComponentProps) {
        super(props);
    }
    
    protected async onInit(): Promise<void> {
        // initialize component
    }
        
    public render() {
        
        const width : string = this.props.width ? this.props.width : "100%";
        const height: string = this.props.height ? this.props.height: "100%";
        
        let attr = {
            className: styles.default.streamVideo + (this.props.className ? " " + this.props.className : " "),
            width: width,
            height: height,
            src: this._buildSrc()
        };

        let attributes : any = attr;

        if(this.props.allowFullScreen === true) {
            attributes = {
                ...attr,
                allowfullscreen:true
            };
        }

        return <div className={styles.default.stream}>
            <iframe  {...attributes}></iframe>
        </div>;

    }

    private _buildSrc() : string {
        
        let src: string = this.props.streamLink;

        if(src.indexOf("embed/video/")===-1 && src.indexOf("/video/")>-1) {
            src = src.replace("video/", "embed/video/");
        }

        if(src) {
            src += "?"
              + (this.props.autoPlay ? "autoplay=true&" : "autoplay=false&")
              + (this.props.showInfo ? "showinfo=true&" : "showinfo=false&")
              + (this.props.startAt ? "st=" + this.props.startAt + "&" : "");
            return src.substr(0, src.length-1);
        }

        return src;

    }

}