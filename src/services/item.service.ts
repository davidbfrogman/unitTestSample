import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Item } from '../models/item';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './base/baseService';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService extends BaseService<Item> {
  constructor(protected http: Http) {
    super(http, Item, {
      rootApiUrl: environment.restUrls.ca,
      urlSuffix: 'items',
      urlSuffixPlural: 'items',
      encodeId: true,
      listUsesPlural: false
    });
  }

  checkOut(id: string): Observable<Item> {
    return super.executeSingleOperation<Item>(id, 'checkout');
  }

  checkIn(id: string): Observable<Item> {
    return super.executeSingleOperation(id, 'checkIn');
  }

  undoCheckOut(id: string): Observable<Item> {
    return super.executeSingleOperation(id, 'undocheckout');
  }

  getVersion(id: string, version: number): Observable<Item> {
    return super.executeSingleOperation(id, `versions/${version}`);
  }

  getVersions(): Observable<Item[]> {
    return super.executeListOperation(null, 'versions');
  }

  revertVersion(id: string, version: number): Observable<Item> {
    return super.executeSingleOperation(id, `versions/${version}/revert`);
  }

  search(query: string, offset: number, limit: number){
    return super.executeListOperation(null, 'search', {'$query': query, '$offset': offset, '$limit': limit});
  }
}
