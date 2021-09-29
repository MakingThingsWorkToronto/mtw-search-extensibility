import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from '@pnp/modern-search-extensibility';
import { StreamComponent } from './components/StreamComponent';

export default class StreamWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
       let props = this.resolveAttributes();

       const stream = React.createElement(StreamComponent, { ...props });

       ReactDOM.render(stream, this);

    }  

}