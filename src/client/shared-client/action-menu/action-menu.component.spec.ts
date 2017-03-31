import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { SohoComponentsModule } from '@infor/sohoxi-angular';
import { ActionMenuComponent } from './action-menu.component';

describe('ActionMenuComponent', () => {
  let component: ActionMenuComponent;
  let fixture: ComponentFixture<ActionMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActionMenuComponent
      ],
      imports: [
        SohoComponentsModule
      ],
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionMenuComponent);
    component    = fixture.componentInstance;
  });

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'ActionMenuComponent'`, async(() => {
    expect(component.title).toEqual('ActionMenuComponent');
  }));

  it(`should render title 'ActionMenuComponent' in a h1 tag`, async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toEqual(component.title);
  }));
});
