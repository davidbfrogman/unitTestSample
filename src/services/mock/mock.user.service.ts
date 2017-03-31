import { User, UserUtility } from '../../models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UsersWithEmails } from './mock-data/users-with-emails.data';

@Injectable()
export class MockUserService extends UserService {
  constructor(protected http: Http) {
    super(http);
  }

  search():  Observable<Array<any>>{
      return Observable.of(UserUtility.BuildUsersFromResponse(UsersWithEmails));
  }
}
