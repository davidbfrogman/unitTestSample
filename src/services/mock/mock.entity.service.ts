import { Entity } from '../../models/entity';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base/baseService';
import { EntityService } from '../entity.service';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { EntitiesWithAttributes } from './mock-data/entities-with-attributes.data';

@Injectable()
export class MockEntityService extends EntityService {

  constructor(protected http: Http) {
    super(http);
  }

  public getList(): Observable<Array<any>>{
    return Observable.of(EntitiesWithAttributes.entities.entity);
  }
}
