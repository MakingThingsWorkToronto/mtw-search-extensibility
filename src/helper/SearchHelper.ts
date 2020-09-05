import { IRefinementFilter, IRefinementValue, RefinementOperator } from "search-extensibility";
import { UrlHelper } from "./UrlHelper";

export interface IUrlFilterParam {

    /**
     * The refiner name
     */
    n: string;

    /**
     * The refinement operator to use between conditions
     */
    o: RefinementOperator;
    
    /**
     * List of conditions for this refiners. These can be raw text (including wildcards) or FQL expressions
     */
    t: string[];
}

export class SearchHelper {

   /**
    * Build the refinement condition in FQL format
    * @param selectedFilters The selected filter array
    * @param encodeTokens If true, encodes the taxonomy refinement tokens in UTF-8 to work with GET requests. Javascript encodes natively in UTF-16 by default.
    */
   public static buildRefinementQueryString(selectedFilters: IRefinementFilter[], encodeTokens?: boolean): string {

        let filters : IUrlFilterParam[] = [];

        selectedFilters.map(filter => {
           
            if (filter.Values.length > 1) {

                // A refiner can have multiple values selected in a multi or mon multi selection scenario
                // The correct operator is determined by the refiner display template according to its behavior
                const conditions = filter.Values.map(value => {

                   return this._encodeFilter(value.RefinementToken, encodeTokens);

                });

                filters.push({
                    n: filter.FilterName,
                    t: conditions,
                    o: filter.Operator
                });

           } else if (filter.Values.length === 1) {
            
                const condition = this._encodeFilter(filter.Values[0].RefinementToken, encodeTokens);

                filters.push({
                    n: filter.FilterName,
                    t: [ condition ],
                    o: filter.Operator
                });
               
           }

        });

        return JSON.stringify(filters);
        
   }

    /**
     * Get the default pre-selected filters based on the url parameters
     */
    public static getRefinementFiltersFromUrl(): IRefinementFilter[] {
        let refinementFilters: IRefinementFilter[] = [];

        // Get and parse filters param for url
        const urlParamValue = UrlHelper.getQueryStringParam("filters", window.location.href);

        try {
            const urlFilters: IUrlFilterParam[] = JSON.parse(decodeURIComponent(urlParamValue));
        
            // Return if url param is not found
            if (!urlFilters) return refinementFilters;

            urlFilters.map((filter: IUrlFilterParam) => {

                if (filter.n && filter.t) {

                    // Map filter values
                    let filterValues: IRefinementValue[] = [];

                    filter.t.map((value: string) => {

                        let token: string = value;

                        // Check if the condition seems to be an FQL filter or not (i.e. value contains one or more FQL reserved operators NOT in quotes)
                        // See https://docs.microsoft.com/en-us/sharepoint/dev/general-development/fast-query-language-fql-syntax-reference
                        if (!(/(and|or|any|andnot|count|decimal|rank|near|onear|int|in32|int64|float|double|datetime|max|min|range|phrase|scope|filter|not|string|starts-with|ends-with|equals|words|xrank)(?=[^"]*("[^"]*"[^"]*)*$)/gm.test(value))) {                            
                            // Encode the text value in HEX
                            token = `ǂǂ${this._stringToHex(value)}`;
                        } else {
                            token = value.replace(/\'/g,'"'); // FQL expressions use double quotes to get it work
                        }
                        
                        let refinementValue: IRefinementValue = {
                            RefinementCount: -1,
                            RefinementName: value,
                            RefinementToken: token,
                            RefinementValue: value
                        };

                        // Date intervals
                        switch (value) {
                            case "yesterday":
                                refinementValue.RefinementToken = `range(${this._getISOPastDate(1)},max)`;
                                break;
                            case "weekAgo":
                                refinementValue.RefinementToken = `range(${this._getISOPastDate(7)},max)`;
                                break;
                            case "monthAgo":
                                refinementValue.RefinementToken = `range(${this._getISOPastDate(30)},max)`;
                                break;
                            case "threeMonthsAgo":
                                refinementValue.RefinementToken = `range(${this._getISOPastDate(90)},max)`;
                                break;
                            case "yearAgo":
                                refinementValue.RefinementToken = `range(${this._getISOPastDate(365)},max)`;
                                break;
                            case "olderThanYear":
                                refinementValue.RefinementToken = `range(min,${this._getISOPastDate(365)})`;
                                break;
                            default:
                                break;
                        }
            
                        filterValues.push(refinementValue);
                    });

                    const filterOperator: RefinementOperator = filter.o ? filter.o : RefinementOperator.AND;

                    refinementFilters.push({
                        FilterName: filter.n,
                        Operator: filterOperator,
                        Values: filterValues
                    });
                }
            });
        } catch (error) {

            let message = `[SearchHelper::getRefinementFiltersFromUrl()] Error when parsing URL filter params (Details: '${error}')`;
            console.log(message);
            refinementFilters = [];
            
        }

        return refinementFilters;
    }

    private static _getISOPastDate(daysToSubstract: number): string {
        return new Date((new Date() as any) - 1000 * 60 * 60 * 24 * daysToSubstract).toISOString();
    }

    // See https://sharepoint.stackexchange.com/questions/258081/how-to-hex-encode-refiners/258161
    private static _encodeFilter(filterValue:string, encodeTokens?:boolean) : string {
        return /ǂǂ/.test(filterValue)  && encodeTokens 
            ? encodeURIComponent(filterValue) 
            : filterValue;
    }

    private static _stringToHex(value: string): string {
        let tokenValue = "";
        for (let i = 0; i < value.length; i++) {
            const charCode = value.charCodeAt(i);
            tokenValue += charCode.toString(16);
        }
        return tokenValue;
    }
}