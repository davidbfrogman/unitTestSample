export class ServiceConfig {
    rootApiUrl: string;
    urlSuffix: string;
    urlSuffixPlural: string;
    urlPrefix: string;

    // This property is used to tell the base class whether we should encode the id on requests
    // this can happen due to spaces not being properly encoded. 
    encodeId: boolean = false;
    listUsesPlural: boolean = true;

    constructor(serviceConfig: ServiceConfigType) {
        this.rootApiUrl = serviceConfig.rootApiUrl;
        this.urlSuffix = serviceConfig.urlSuffix;
        this.urlSuffixPlural = serviceConfig.urlSuffixPlural;
        if(serviceConfig.urlPrefix !== undefined) {
            this.urlPrefix = serviceConfig.urlPrefix;
        }
        if(serviceConfig.encodeId !== undefined) {
            this.encodeId = serviceConfig.encodeId;
        }
        if(serviceConfig.listUsesPlural !== undefined) {
            this.listUsesPlural = serviceConfig.listUsesPlural;
        }
    }
}

export declare type ServiceConfigType = {
    rootApiUrl: string,
    urlSuffix: string,
    urlSuffixPlural: string,
    urlPrefix?: string,
    encodeId?: boolean,
    listUsesPlural?: boolean
};