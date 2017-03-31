import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DocumentDetailTabsComponent } from './document-detail-tabs.component';
import { Item } from 'models/item';
import { SohoComponentsModule } from '@infor/sohoxi-angular';

describe('DocumentDetailTabsComponent', () => {
  let fixture: ComponentFixture<DocumentDetailTabsComponent>;
  let component: DocumentDetailTabsComponent;

  const testItem: Item = <Item> {
    pid: "MDS_File-1-3-LATEST", 
    filename:"Instructions.pdf",
    displayName:"My document"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SohoComponentsModule
      ],
      declarations: [
        DocumentDetailTabsComponent
      ]
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDetailTabsComponent);
    component = fixture.componentInstance;

    component.item = testItem;
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(DocumentDetailTabsComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have as title 'DocumentDetailTabsComponent'`, () => {
    expect(component.title).toEqual('DocumentDetailTabsComponent');
  });

  it(`should render title in a h1 tag`, () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toEqual(component.title);
  });

  it(`should render display name in a p tag`, () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p[id=displayName]').textContent).toEqual(testItem.displayName);
  });
});
