export class UpcomingGroup {
    
    public static helper(list: any[], options: any) : string {
        if(!list) return "";
        
        const keys:string[] = [];        
        const groups: any = {};
        const groupField = options && options.hash && options.hash.by ? options.hash.by : "";
        const noop = () : string => { return ''; };    
        const fn = options.fn || noop;        
        const renderGroup = (buffer:any, key:string) : void => { 
            return buffer + fn(groups[key]); 
        };
        const now = new Date(Date.now());
        
        groups["Upcoming"] = {
            value: "Upcoming",
            items: []
        };
        keys.push("Upcoming");

        groups["Past"] = {
            value: "Past",
            items: []
        };
        keys.push("Past");

        list.map(item=>{

            let newDate : Date = new Date(Date.now());
            
            try {
                newDate = new Date(item[groupField]);
            } catch(e){}

            const key = (newDate > now) ? "Upcoming" : "Past";

            groups[key].items.push(item);

        });

        return keys.reduce(renderGroup, '');

    }

}