import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ThumbnailListComponent } from './thumbnail-list.component';

describe('ThumbnailListComponent', () => {
  let fixture: ComponentFixture<ThumbnailListComponent>;
  let component: ThumbnailListComponent;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ThumbnailListComponent
      ]
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailListComponent);
    component    = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailListComponent);
    component    = fixture.componentInstance;
  });

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'ThumbnailListComponent'`, async(() => {
    expect(component.title).toEqual('ThumbnailListComponent');
  }));

  it(`should render title 'ThumbnailListComponent' in a h1 tag`, async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toEqual(component.title);
  }));
});
