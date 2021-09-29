import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from '@pnp/modern-search-extensibility';
import { RatingsComponent } from './components/RatingsComponent';

export default class RatingsWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
        let props = this.resolveAttributes();
        props.serviceScope = this._serviceScope;
        
        // You can use this._ctx here to access current Web Part context
        const component = React.createElement(RatingsComponent, {...props });

        ReactDOM.render(component, this);

    }  

}