import { convertToClassName } from '../../helper/CssHelper';

export class ConvertToClassNameHelper {
    
    public static helper(input: string) : string {
        if(!input) return "";
        return convertToClassName(input);
    }

}