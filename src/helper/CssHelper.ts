/**
* Converts input text into a valid css classname
* @param text the string we want to convert into a valid classname
*/
export const convertToClassName = (text:string) : string => {

    // Credit to: https://gist.github.com/dbowling/2589645
    return text 
            ? text
                .replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '')
                .replace(/＆/g,'')
                .replace(/[\W]/g, '-')
                .replace(/-+/g,'-')
                .toLowerCase()
            : "";
 
 };