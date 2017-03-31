import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ControlCenterComponent } from './control-center.component';

describe('ControlCenterComponent', () => {
  let fixture: ComponentFixture<ControlCenterComponent>;
  let component: ControlCenterComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ControlCenterComponent
      ]
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlCenterComponent);
    component    = fixture.componentInstance;
  });

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'ControlCenterComponent'`, async(() => {
    expect(component.title).toEqual('ControlCenterComponent');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toEqual(component.title);
  }));
});
