import {} from 'jasmine';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { SohoComponentsModule } from '@infor/sohoxi-angular';
import { AdvancedSearchComponent } from './advanced-search.component';
import { SearchService } from '../search.service';

describe('AdvancedSearchComponent', () => {
  let component: AdvancedSearchComponent;
  let fixture: ComponentFixture<AdvancedSearchComponent>;
  let nativeElement: HTMLElement;
  const inputXqueryValue = 'testQuery';
  let searchService: SearchService ;

  beforeEach(async(() => {
    // stub searchServiceStub for test purposes
    const searchServiceStub = {
      getXQuery: 'test xQuery',
    };

    TestBed.configureTestingModule({
      declarations: [
        AdvancedSearchComponent
      ],
      imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        SohoComponentsModule
      ],
      providers: [{provide: SearchService, useValue: searchServiceStub}]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    // SearchService actually injected into the component
    searchService = TestBed.get(SearchService);

    fixture = TestBed.createComponent(AdvancedSearchComponent);
    component    = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
  });

  it('should create the advanced search component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('no content in the advanced-search somponent', () => {
    expect(component.xQuery).toEqual('/MDS_GenericDocument');
  });

  // Test @input
  it('should display a different xQuerys depending on binding', () => {
    component.xQuery = inputXqueryValue;
    fixture.detectChanges();
    expect(nativeElement.textContent).toContain(inputXqueryValue);
  });

  // Test @output
  it('should raise selected event when clicked', () => {
    let changedXQuery: string;
    // Subscribe to emitter
    component.xQueryChanged.subscribe((xQuery: string) => changedXQuery = xQuery);
    // Add value in textarea through the binding
    component.xQuery = inputXqueryValue;
    // Trigger initial data binding to get value in textarea
    fixture.detectChanges();
    // Run the event method
    component.onClickSearch();
    expect(changedXQuery).toBe(inputXqueryValue);
  });
});
