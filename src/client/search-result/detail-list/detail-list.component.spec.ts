import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DetailListComponent } from './detail-list.component';

describe('DetailListComponent', () => {
  let component: DetailListComponent;
  let fixture: ComponentFixture<DetailListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailListComponent
      ]
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailListComponent);
    component    = fixture.componentInstance;
  });

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'DetailListComponent'`, async(() => {
    expect(component.title).toEqual('DetailListComponent');
  }));

  it(`should render title 'DetailListComponent' in a h1 tag`, async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toEqual(component.title);
  }));
});
