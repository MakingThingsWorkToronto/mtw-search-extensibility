import { ServiceScope } from "@microsoft/sp-core-library";
import { SPFI, spfi, SPFx } from "@pnp/sp";
import { PageContext } from "@microsoft/sp-page-context";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export class SharePointService {  

    private _serviceScope: ServiceScope;
    private _pageContext: PageContext;
    private _sp: SPFI;

    constructor(serviceScope:ServiceScope) {
        this._serviceScope = serviceScope;
        this._serviceScope.whenFinished(() => {

            this._pageContext = this._serviceScope.consume(PageContext.serviceKey);
                
        });
    }

    public async getFieldValue(webUrl:string, listId:string , listItemId:number , columnName:string) : Promise<string> {

        const sp = spfi(webUrl).using(SPFx(this._pageContext as any));
        const list = sp.web.lists.getById(listId);
        const listItem = await list.items.getById(listItemId).select(columnName)();

        return listItem[columnName];

    }

}