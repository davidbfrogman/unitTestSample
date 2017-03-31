import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ListViewSelectorComponent } from './list-view-selector.component';
import { SohoComponentsModule } from '@infor/sohoxi-angular';

describe('ListViewSelectorComponent', () => {
  let component: ListViewSelectorComponent;
  let fixture: ComponentFixture<ListViewSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListViewSelectorComponent
      ],
      imports: [
        SohoComponentsModule
      ]
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewSelectorComponent);
    component    = fixture.componentInstance;
  });

  it(`should create the component`, async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'ListViewSelectorComponent'`, async(() => {
    expect(component.title).toEqual('ListViewSelectorComponent');
  }));

  it(`should render title 'ListViewSelectorComponent in a h1 tag`, async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toEqual(component.title);
  }));
});
