import { } from 'jasmine';
import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { ReflectiveInjector } from '@angular/core';
import { DebugElement } from '@angular/core';
import { SohoComponentsModule } from '@infor/sohoxi-angular';
import { AttributeSearchComponent } from './attribute-search.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntityService } from '../../../services/entity.service';
import { MockEntityService } from '../../../services/mock/mock.entity.service';
import { MockUserService } from '../../../services/mock/mock.user.service';
import { Entity } from '../../../models/entity';
import { Attribute } from '../../../models/attribute';
import { Operation } from '../../../models/operation';
import { UserService } from '../../../services/user.service';
import { HttpModule } from '@angular/http';
import { SearchStackEventBus } from '../../../event-buses/search-stack-event-bus';
import { Http, Response, Headers, RequestOptions, XHRBackend, BaseRequestOptions, ConnectionBackend, } from '@angular/http';
import { Injectable } from '@angular/core';
import { SearchStack } from '../../../models/search-stack';
import { SearchStyleType, AttributeType, OperationType } from '../../../enumerations';
import { SearchOperationFactory } from '../search-operation-factory';

fdescribe('AttributeSearchComponent', () => {
  let component: AttributeSearchComponent;
  let fixture: ComponentFixture<AttributeSearchComponent>;
  let nativeElement: HTMLElement;
  let mockEntityService: MockEntityService;
  let entityService: EntityService;
  let userService: UserService;
  let searchStackEventBus: SearchStackEventBus;
  let mockUserService: MockUserService;
  let searchStackForTesting: SearchStack;
  beforeAll(() => {
    let mes = new MockEntityService(null);
    mes.getList().subscribe((entities) => {
      let entityList = entities; //Get Some entities
      if (entityList && entityList.length > 0) {
        //Build a search stack to use for testing
        searchStackForTesting = new SearchStack(entityList[0], entityList[0].attrs.attr[0], new SearchOperationFactory().findOperationByType(OperationType.EqualTo), "DBOperand", "FreeTextOperand Testing", "Draft");
      }
    })
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AttributeSearchComponent
      ],
      imports: [
        CommonModule,
        SohoComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
      ],
      providers: [
        { provide: EntityService, useClass: MockEntityService },
        { provide: UserService, useClass: MockUserService },
        SearchStackEventBus,
        MockEntityService,
        MockUserService,
      ],
    });
    fixture = TestBed.createComponent(AttributeSearchComponent);
    TestBed.compileComponents();
  });

  beforeEach(inject([MockEntityService, MockUserService, SearchStackEventBus],
    (mes: MockEntityService, mus: MockUserService, ssEB: SearchStackEventBus) => {
      mockEntityService = mes;
      searchStackEventBus = ssEB;
      mockUserService = mus;
      entityService = mes;
      userService = mus;
      component = new AttributeSearchComponent(mes, mus, ssEB);
      fixture.componentInstance = component;
    }));


  it('should create the AttributeSearchComponent', () => {
    expect(component).toBeTruthy();
  });

  it('no content in the AttributeSearchComponent', () => {
    expect(component.xQuery).not.toBeDefined();
  });

  // Test that the component loads a list of entities
  it('should call the api to get entities', fakeAsync(() => {
    spyOn(entityService, 'getList').and.callThrough();
    component.populateEntitiesList();
    tick();
    expect(entityService.getList).toHaveBeenCalled();
    expect(entityService.getList).toHaveBeenCalledTimes(1);
  }));

  it('should populate the entities list', fakeAsync(() => {
    spyOn(entityService, 'getList').and.callThrough();
    component.populateEntitiesList();
    tick();
    expect(component.entityList).toBeTruthy();
    expect(component.entityList.length).toBeGreaterThan(0);
  }));

  // TODO: Write a test to check how many select elements, are in the input after binding
  // to a list of entities component.nativeElement should work well for this.

  it('should get execute a search when a user types in the autocomplete user drop down', fakeAsync(() => {
    spyOn(userService, 'search').and.callThrough();

    component.searchUserFormControl.valueChanges.subscribe((newValue) => {
      expect(newValue).toBe('d');
      tick(450); // We wait 450 here, because currently the disticnt in the UI is setup is for 400
      expect(userService.search).toHaveBeenCalled();
      expect(userService.search).toHaveBeenCalledTimes(1);
    })

    component.searchUserFormControl.setValue('d');
  }));

  it('should get populate a list of users when a user types in the autocomplete drop down', fakeAsync(() => {
    component.searchUserFormControl.valueChanges.subscribe((newValue) => {
      expect(newValue).toBe('d');
      tick(450); // We wait 450 here, because currently the disticnt in the UI is setup is for 400
      expect(component.usersList.length).toBeGreaterThan(0);
      expect(component.operandUserValue).toBe('d');
    })

    component.searchUserFormControl.setValue('d');
  }));

  it('when I click the edit button in search stack component, the values are set correctly in the attribute search componet', () => {
    component.searchStackEventBus.searchStackEdited$.subscribe((searchStack) => {
      expect(component.selectedEntity).toEqual(searchStackForTesting.entity);
      expect(component.selectedOperation).toEqual(searchStackForTesting.operation);
      expect(component.selectedAttribute).toEqual(searchStackForTesting.attribute);
    })
    // Now that we setup our expectations, we actually push a search stack onto the bus,
    // Then we check that our component pulled it off the bus, and then pushed the properties onto the UI
    component.searchStackEventBus.editSearchStack(searchStackForTesting);
  });

  it('should populate the attributes list when an entity is selected', async(() => {
    component.populateEntitiesList();
    component.selectedEntity = component.entityList[1];
    component.onSelectedEntityChanged(component.selectedEntity);
    expect(component.attributeList).toBeTruthy();
    expect(component.attributeList.length).toBeGreaterThan(0);
  }));

  it('should populate the operator list when an attribute is selected', async(() => {
    component.populateEntitiesList();
    component.selectedEntity = component.entityList[1];
    component.onSelectedEntityChanged(component.selectedEntity);
    component.selectedAttribute = component.selectedEntity.attrs.attr[1];
    component.onSelectedAttributeChanged(component.selectedAttribute);
    expect(component.operatorList).toBeTruthy();
    expect(component.operatorList.length).toBeGreaterThan(0);
  }));

  it('should reset all the UI controls when the selected entity is changed', async(() => {
    component.populateEntitiesList();
    component.selectedEntity = component.entityList[1];
    component.onSelectedEntityChanged(component.selectedEntity);
    component.selectedAttribute = component.selectedEntity.attrs.attr[1];
    component.onSelectedAttributeChanged(component.selectedAttribute);
    component.onSelectedEntityChanged(component.entityList[0]);
    expect(component.operatorList).toBeFalsy();
    expect(component.showStringInputForAttrSearch).toBeTruthy();
  }));

  it('should build the xquery when the user hits search', async(() => {
    component.populateEntitiesList();

    // The easiest way to test this, is to use a search stack to set the UI,
    // Add the stack to the event bus, which will initalize all it's arrays;
    component.searchStackEventBus.addSearchStack(searchStackForTesting);
    // Push a stack to edit, which this component will pick up, and setup the ui for it.
    component.searchStackEventBus.editSearchStack(searchStackForTesting);

    // We didn't make any changes, but we need  to move the component, from edit mode
    // to search mode, so we can click search.
    component.onClickSaveStack();

    //Now we can click search, with a UI that has all the fields filled out.
    component.onClickSearch();

    expect(component.xQuery).toBeTruthy();
    expect(component.xQuery.length).toBeGreaterThan(0);
    console.log(`The components xquery is: ${component.xQuery}`);
  }));

});
