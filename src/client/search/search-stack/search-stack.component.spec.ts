import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStackComponent } from './search-stack.component';

describe('SearchStackComponent', () => {
  let component: SearchStackComponent;
  let fixture: ComponentFixture<SearchStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
