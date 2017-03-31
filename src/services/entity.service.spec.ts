import {} from 'jasmine';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { TestBed, async, inject } from '@angular/core/testing';
import { EntityService } from './entity.service';

describe('EntityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, HttpModule],
      providers: [EntityService]
    });
  });

  it('should ...', inject([EntityService], (service: EntityService) => {
    expect(service).toBeTruthy();
  }));
});
