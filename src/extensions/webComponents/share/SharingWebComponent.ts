import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from 'search-extensibility';
import { SharingComponent } from './components/SharingComponent';

export default class SharingWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
       let props = this.resolveAttributes();

       // You can use this._ctx here to access current Web Part context
       const exampleComponent = React.createElement(SharingComponent, { ...props });

       ReactDOM.render(exampleComponent, this);

    }  

}