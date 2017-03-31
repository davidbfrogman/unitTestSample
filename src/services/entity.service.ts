import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Entity } from '../models/entity';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './base/baseService';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class EntityService extends BaseService<Entity> {
  constructor(protected http: Http) {
    super(http, Entity, { 
      rootApiUrl: environment.restUrls.ca,
      urlSuffix: 'entity',
      urlSuffixPlural: 'entities',
      urlPrefix: 'datamodel',
      encodeId: true
    });
  }
}
