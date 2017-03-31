import {} from 'jasmine';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SohoComponentsModule } from '@infor/sohoxi-angular';

import {SearchComponent} from './search.component';
import {AdvancedSearchComponent} from './advanced-search/advanced-search.component';
import {AttributeSearchComponent} from './attribute-search/attribute-search.component';
import {SearchStackComponent} from './search-stack/search-stack.component';
import {ShortcutsComponent} from './shortcuts/shortcuts.component';

import { SearchStackEventBus } from '../../event-buses/search-stack-event-bus';

import { SearchService } from './search.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchService: SearchService ;

  beforeEach(async(() => {
    // stub searchServiceStub for test purposes
    const searchServiceStub = {
      getXQuery: 'test xQuery',
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        SohoComponentsModule,
        FormsModule
      ],
      declarations: [  SearchComponent, AdvancedSearchComponent, AttributeSearchComponent, ShortcutsComponent, SearchStackComponent],
      providers: [SearchService, SearchStackEventBus]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    // SearchService actually injected into the component
    searchService = TestBed.get(SearchService);

    fixture = TestBed.createComponent(SearchComponent);
    component    = fixture.componentInstance;
  });

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'SearchComponent'`, async(() => {
    expect(component.title).toEqual('SearchComponent');
  }));

  it(`should render title 'SearchComponent' in a h1 tag`, async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toEqual(component.title);
  }));
});
