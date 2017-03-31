import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { SohoComponentsModule } from '@infor/sohoxi-angular';
import { RelatedinformationComponent } from './relatedinformation.component';

describe('RelatedinformationComponent', () => {
  let component: RelatedinformationComponent;
  let fixture: ComponentFixture<RelatedinformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RelatedinformationComponent
      ],
      imports: [
        SohoComponentsModule
      ],
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedinformationComponent);
    component    = fixture.componentInstance;
  });

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'RelatedinformationComponent'`, async(() => {
    expect(component.title).toEqual('RelatedinformationComponent');
  }));

  it(`should render title 'RelatedinformationComponent' in a h1 tag`, async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toEqual(component.title);
  }));
});
