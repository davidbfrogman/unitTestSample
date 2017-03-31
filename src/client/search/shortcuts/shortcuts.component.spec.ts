import {} from 'jasmine';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ShortcutsComponent } from './shortcuts.component';
import { SearchService } from '../search.service';

describe('ShortcutsComponent', () => {
  let component: ShortcutsComponent;
  let fixture: ComponentFixture<ShortcutsComponent>;
  let searchService: SearchService ;

  beforeEach(async(() => {
    // stub searchServiceStub for test purposes
    const searchServiceStub = {
      getXQuery: 'test xQuery',
    };

    TestBed.configureTestingModule({
      declarations: [
        ShortcutsComponent
      ],
      providers: [{provide: SearchService, useValue: searchServiceStub}]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    // SearchService actually injected into the component
    searchService = TestBed.get(SearchService);

    fixture = TestBed.createComponent(ShortcutsComponent);
    component    = fixture.componentInstance;
  });

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  // Test @output
  it('should raise selected event when checkedOutByMeClicked', () => {
    let newQuery: string;
    // Subscribe to emitter
    component.shortcutQueryChanged.subscribe((query: string) => newQuery = query);
    // Run the event method
    component.checkedOutByMeClicked();
    expect(newQuery).toBe(component.QUERY_CHECKOUT_BY_ME);
  });

  // Test @output
  it('should raise selected event when createdByMeClicked', () => {
    let newQuery: string;
    // Subscribe to emitter
    component.shortcutQueryChanged.subscribe((query: string) => newQuery = query);
    // Run the event method
    component.createdByMeClicked();
    expect(newQuery).toBe(component.QUERY_CREATED_BY_ME);
  });
});
