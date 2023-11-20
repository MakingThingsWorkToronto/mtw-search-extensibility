
export class ReplaceDomain {
    
    public static helper(input: string, newDomain: string) : string {
        
        if(!input) return "";
        
        const urlParts = input.split(",");

        if(urlParts.length > 0) {

            const parts = urlParts[0].split("/");
            
            let postFix = "";

            parts.forEach((part:string, index:number)=>{
                if(index>2){
                    postFix += "/" + part;
                }
            });
            
            return newDomain + postFix;

        }
        
        return input;

    }

}