
export class GetUserDisplayName {
    
    public static helper(input: string) : string {
        if(!input) return "";
        const parts = input.split("|");
        if(parts.length > 1) {
            return parts[1].trim();
        }
        return input;
    }

}