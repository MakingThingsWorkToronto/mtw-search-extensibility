import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from '@pnp/modern-search-extensibility';
import { PageHeaderComponent } from './components/PageHeaderComponent';

export default class PageHeaderWebComponent extends BaseWebComponent {
   
    public constructor() {
        super(); 
    }
 
    public async connectedCallback() {
        
       let props = this.resolveAttributes();

       // You can use this._ctx here to access current Web Part context
       const exampleComponent = React.createElement(PageHeaderComponent, { ...props });

       ReactDOM.render(exampleComponent, this);

    }  

}