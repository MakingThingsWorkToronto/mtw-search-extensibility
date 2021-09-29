import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from '@pnp/modern-search-extensibility';
import { RegisterComponent } from './components/RegisterComponent';

export default class RegisterWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
       let props = this.resolveAttributes();

       props.serviceScope = this._serviceScope;
       
       // You can use this._ctx here to access current Web Part context
       const reg = React.createElement(RegisterComponent, { ...props });

       ReactDOM.render(reg, this);

    }  

}