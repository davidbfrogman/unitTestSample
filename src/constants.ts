// Should be all uppercase

export class Constants{
    public static SOHO_DATEPICKER_DATE_FORMAT: string = 'MM/DD/YYYY HH:MM:SS';
    public static REST_API_SEARCH_DATE_FORMAT: string = 'YYYY-MM-DDTHH:MM:SS[.000Z]'; //Moment uses [] for escape chars.
    public static SOHO_TIMEPICKER_TIME_FORMAT: string = 'HH:MM:SS';
    public static REST_API_SEARCH_TIME_FORMAT: string = 'HH:MM:SS[Z]'; //Moment uses [] for escape chars. 
}
