import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BaseModel } from '../../models/base/BaseModel';
import { RestUrlBuilder, RestUrlConfigType } from '../../utility/builder/restUrlBuilder';
import { Observable } from 'rxjs/Observable';
import { Item } from '../../models/item';
import { ServiceConfig, ServiceConfigType } from './serviceConfig';
import 'rxjs/add/operator/map';

export abstract class BaseService<T extends BaseModel> {
    protected serviceConfig: ServiceConfig;
    protected restUrlBuilder: RestUrlBuilder = new RestUrlBuilder();
    protected reqOptions: RequestOptions;
    protected model;

    constructor(protected http: Http, typeOfClass: {new() : T}, serviceConfig: ServiceConfigType) {
        this.serviceConfig = new ServiceConfig(serviceConfig);
        this.reqOptions = new RequestOptions({
            headers: new Headers({'Content-Type': 'application/json'}),
            withCredentials: true
        });
        
        this.restUrlBuilder.withConfig({
            rootApiUrl: this.serviceConfig.rootApiUrl,
            urlSuffix: this.serviceConfig.urlSuffix,
            urlSuffixPlural: this.serviceConfig.urlSuffixPlural,
            urlPrefix: this.serviceConfig.urlPrefix
        });
        this.model = new typeOfClass();
        return this;
    }

    get<T extends BaseModel>(id: string): Observable<T>  {
        const url = this.buildUrl({id});
        return this.http
            .get(url, this.reqOptions)
            .map((res: Response) => {
                const responseObject = res.json();
                return responseObject[Object.keys(responseObject)[0]];
            })
            .catch(this.handleError);
    }

    getList<T extends BaseModel>(query?: Object): Observable<T[]>  {
        const url = this.buildUrl({usePlural: this.serviceConfig.listUsesPlural, query});
        return this.http
        .get(url, this.reqOptions)
            .map((res: Response) => {
                const responseObject = res.json();
                //This looks really funny, but basically list operations return a root for the list, and then another root for the items.
                //So you have to de reference the root 2 times, for example first with "Entities", and then with "Entity" to actually
                //access the array that's returned. 
                //We might be able to clean this up with url suffix if this is too obnoxious to debug.
                return responseObject[Object.keys(responseObject)[0]][Object.keys(responseObject[Object.keys(responseObject)[0]])[0]];
            })
            .catch(this.handleError);
    }

    delete<T extends BaseModel>(id: string, query?: Object): Observable<void> {
        id = this.serviceConfig.encodeId ? BaseService.getPidEncoded(id) : id;
        const url = this.buildUrl({id, query});
        return this.http
            .delete(url, this.reqOptions)
            .map((res: Response) => {
                const responseObject = res.json();
                return responseObject;
            })
            .catch(this.handleError);
    }

    create<T extends BaseModel>(T: T, query?: Object): Observable<T> {
        const url = this.buildUrl({query});
        const rootName:string = this.model.constructor.name.toLowerCase();
        const body = { [rootName]: T };
        return this.http
            .post(this.buildUrl({query}), body, this.reqOptions)
            .map((res: Response) => {
                const responseObject = res.json();
                return responseObject[Object.keys(responseObject)[0]];
            })
            .catch(this.handleError);
    }

    update<T extends BaseModel>(T: T, query?: Object): Observable<T> {
        const url = this.buildUrl({query});
        const rootName:string = this.model.constructor.name.toLowerCase();
        const body = { [rootName]: T };
        return this.http
            .put(this.buildUrl({query}), { [rootName]: T }, this.reqOptions)
            .map((res: Response) => {
                const responseObject = res.json();
                return responseObject[Object.keys(responseObject)[0]];
            })
            .catch(this.handleError);
    }

    // This is used for single operations that execute, and return a single object.
    // item.checkout is a good example of this kind of operation.
    executeSingleOperation<T extends BaseModel>(id: string, operation: string, query?: Object): Observable<T> {
        const url = this.buildUrl({id, operation, query});
        return this.http
            .get(url, this.reqOptions)
            .map((res: Response) => {
                const responseObject = res.json();
                return responseObject[Object.keys(responseObject)[0]];
            })
            .catch(this.handleError);
    }

    // This is used for listing operations that return a list of objects.
    // item.versions is a good example, where you're going to return a list of items.
    executeListOperation<T extends BaseModel>(id: string, operation: string, query?: Object): Observable<T[]> {
        const url = this.buildUrl({id, operation, query});
        return this.http.get(url, this.reqOptions).map((res: Response) => {
                const responseObject = res.json();
                return responseObject[Object.keys(responseObject)[0]];
            })
            .catch(this.handleError);
    }

    // tslint:disable-next-line:member-ordering
    public static convertToClass<T>(obj: Object, classToInstantiate): T {
        for (const i in obj) {
            if (obj.hasOwnProperty(i)) {
                classToInstantiate[i] = obj[i];
            }
        }
        return classToInstantiate;
    }

	public static getPidEncoded(id: string):string{
		return (id) ? id.replace(` `, `%20`) : id;
	}

    protected buildUrl(configuration?: RestUrlConfigType): string {
       const url: string = this.restUrlBuilder.withConfig(configuration).build();
       return url;
    }

    protected handleError(error: Response | any) {
        // TODO: Implement Real Logging infrastructure.
        // Might want to log to remote server (Fire and forget style)
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        //console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
