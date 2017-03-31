import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { PreviewComponent } from './preview.component';

describe('PreviewComponent', () => {
  let fixture: ComponentFixture<PreviewComponent>;
  let component: PreviewComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PreviewComponent
      ]
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewComponent);
    component    = fixture.componentInstance;
  });

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'PreviewComponent'`, async(() => {
    expect(component.title).toEqual('PreviewComponent');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toEqual(component.title);
  }));
});
