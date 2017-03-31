import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { User, UserUtility } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './base/baseService';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(protected http: Http) {
    super(http, User, { 
      rootApiUrl: environment.restUrls.ca,
      urlSuffix: 'users', //Hardcoding this here  now.  I know this isn't right, but this service doesn't follow the standards.
      urlSuffixPlural: 'users',
      urlPrefix: 'admin',
      encodeId: true
    });
  }

  search(filter: string, limit: number): Observable<User[]> {
    //This user search is pretty non standard.  So we're going to override it here
    const url = super.buildUrl({ id: null, operation: null, query: { '$filter': filter, '$limit': limit } });
    return this.http.get(url, this.reqOptions).map((res: Response) => {
        return UserUtility.BuildUsersFromResponse(res.json());
        // let usersArray = Array<User>();
        // const responseObject = res.json();
        // for (var users in responseObject) {
        //   let user = new User();
        //   user.name = users;
        //   user.email = responseObject[users];
        //   user.nameAndEmail = `${user.name} <${user.email}>`;
        //   if (user.name.length != 0) {
        //     usersArray.push(user);
        //   }
        // }
        // return usersArray;
      })
      .catch(this.handleError);
  }
}
