import {} from 'jasmine';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentDetailsComponent } from './document-details.component';
import { SohoComponentsModule } from '@infor/sohoxi-angular';
import { PreviewComponent } from './preview/preview.component';
import { SharedClientModule } from '../shared-client/shared-client.module';
import { DocumentDetailTabsComponent } from './document-detail-tabs/document-detail-tabs.component';
import { ItemService } from 'services/item.service';

import { HttpModule } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Item } from 'models/item';

describe('DocumentDetailsComponent', () => {
  let fixture: ComponentFixture<DocumentDetailsComponent>;
  let component: DocumentDetailsComponent;
  let itemService: ItemService;

  let spy: jasmine.Spy;
  let expectedPid: string = 'MDS_File-1-1-Latest';
  let promise: Promise<Item>;
  const testItem = {"createdBy":"DJONSSON1","createdByName":"djonsson1","createdTS":"2017-01-19T11:21:43Z","lastChangedBy":"DJONSSON1","lastChangedByName":"djonsson1","lastChangedTS":"2017-03-10T15:22:47Z","filename":"Instructions.pdf","size":"354663","pid":"MDS_File-1-3-LATEST","id":"1","version":"3","reprItem":"MDS_Name","displayName":"My document","entityName":"MDS_File","attrs":{"attr":[{"name":"MDS_Name","type":"1","qual":"MDS_Name","value":"My document"},{"name":"MDS_Status","type":"3","qual":"MDS_Status","value":"5"}]},"acl":{"name":"Public"}};
  const testItem2 = {"createdBy":"AMJANSSON","createdByName":"amjansson","createdTS":"2017-03-21T12:33:53Z","lastChangedBy":"AMJANSSON","lastChangedByName":"amjansson","lastChangedTS":"2017-03-22T16:11:22Z","filename":"Instructions.pdf","size":"354663","pid":"MDS_File-1-4-LATEST","id":"1","version":"4","reprItem":"MDS_Name","displayName":"My document","entityName":"MDS_File","attrs":{"attr":[{"name":"MDS_Name","type":"1","qual":"MDS_Name","value":"My document"},{"name":"MDS_Status","type":"3","qual":"MDS_Status","value":"5"}]},"acl":{"name":"Public"}}
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SohoComponentsModule,
        FormsModule,
        SharedClientModule,
        HttpModule
      ],
      declarations: [
        DocumentDetailsComponent,
        PreviewComponent,
        DocumentDetailTabsComponent
      ],
      providers: [ItemService]
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDetailsComponent);
    component = fixture.componentInstance;

    itemService = fixture.debugElement.injector.get(ItemService);

    spy = spyOn(itemService, 'get');
  });

  describe('constructor()', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it(`should have as title 'DocumentDetailsComponent'`, () => {
      expect(component.title).toEqual('DocumentDetailsComponent');
    });

    it(`should render title 'DocumentDetailsComponent' in a h1 tag`, () => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toEqual(component.title);
    });

    it('should set the item', fakeAsync(() => {
      // Given
      component.pid = expectedPid;
      spy.and.returnValue(Observable.fromPromise(Promise.resolve(testItem)));

      // When
      fixture.detectChanges();
      tick();

      // Then
      expect(itemService.get).toHaveBeenCalledTimes(1);
      expect(itemService.get).toHaveBeenCalledWith(expectedPid);
      expect(component.item.createdBy).toEqual("DJONSSON1");
    }));
  })

  describe('getItem()', () => {
    it("should set a new item", fakeAsync(() => {
      // Given
      spy.and.returnValue(Observable.fromPromise(Promise.resolve(testItem2)));

      //When
      fixture.detectChanges();
      component.getItem(expectedPid);
      tick();

      //Then
      expect(component.item.createdBy).toEqual("AMJANSSON");
    }));
  });
});
