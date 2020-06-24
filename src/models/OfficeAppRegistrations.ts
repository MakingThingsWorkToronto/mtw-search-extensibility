export enum OfficeAppRegistrations {
    Word = "ms-word:",
    PowerPoint = "ms-powerpoint:",
    Excel = "ms-excel:",
    Visio = "ms-visio:",
    Access = "ms-access:",
    Project = "ms-project:",
    Publisher = "ms-publisher:",
    SharePointDesigner = "ms-spd:",
    InfoPath = "ms-infopath:"
}

export enum OfficeAppCommands {
    View = "ofv|u|{url}",
    Edit = "ofe|u|{url}",
    NewFromTemplate = "nft|u|{url}",
    NewFromTemplateDefaultSave = "nft|u|{url}|s|{save}"
}

export class Office {

    public static formatLink(scheme:string, fileType:string, url:string, defaultSave?:string) {
        const ac = OfficeAppCommands;
        const r = Office.getAppRegistration(fileType);
        if(scheme=="view") {
            return r + ac.View.replace("{url}",url);
        } else if (scheme =="edit") {
            return r + ac.Edit.replace("{url}",url);
        } else if (scheme == "newfromtemplate"){
            return r + ac.NewFromTemplate.replace("{url}",url);
        } else if (scheme == "newfromtemplatedefaultsave"){
            return r + ac.NewFromTemplateDefaultSave.replace("{url}",url).replace("{save}", defaultSave);
        } else {
            return url;
        }
    }

    public static getAppRegistration(fileType:string) : OfficeAppRegistrations {

        const t = OfficeAppRegistrations;
        const is = Office;

        if(is.in(fileType, ["docx","doc","dot","wbk","docm","dotx","dotm","docb"])) {
            return t.Word;
        } else if (is.in(fileType, ["pptx", "ppt","pot","pps","pptm","potx","potm","ppam","ppsx","ppsm","sldx","sldm"])) {
            return t.PowerPoint;
        } else if (is.in(fileType,["xlt","xlm","xlsx","xls","csv","xlsm","xlt","xltm","xlsb","xla","xlam","xll","xlw"])) {
            return t.Excel;
        } else if (is.in(fileType,["vsd","vsdx","vdx","vsdm"])){
            return t.Visio;
        } else if (is.in(fileType, ["adn", "accdb", "accdr", "accdt","accda", "mdw","accde","mam","maq","mar","mat","maf","laccdb","ade","adp","mdb","cdb","mda","mdn","mdt","mdf","mde","ldb"])) {
            return t.Access;
        } else if (is.in(fileType,["mpp","mpt"])) {
            return t.Project;
        } else if (is.in(fileType,["pub"])) {
            return t.Publisher;
        } else if (is.in(fileType,[])){
            return t.SharePointDesigner;
        } else if (is.in(fileType, ["xsn"])){
            return t.InfoPath;
        }

    }

    private static in(compare:string,list:string[]) : boolean {
        return list.some((ext)=> { return ext === compare; });
    }

}