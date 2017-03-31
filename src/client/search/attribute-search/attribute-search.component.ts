import { Component, Input, Output, EventEmitter, OnInit,ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EntityService } from '../../../services/entity.service';
import { UserService } from '../../../services/user.service';
import { Entity, EntityUtility } from '../../../models/entity';
import { Attribute, AttributeUtility, Value } from '../../../models/attribute';
import { SearchStyleType, AttributeType, OperationType } from '../../../enumerations';
import { xQueryBuilder } from '../../../utility/builder/xQueryBuilder';
import { SearchOperationFactory } from '../search-operation-factory';
import { Operation } from '../../../models/operation';
import { SearchStack } from '../../../models/search-stack';
import { SohoDatePickerComponent, SohoDropDownComponent, SohoTimePickerComponent } from '@infor/sohoxi-angular';
import { SearchStackEventBus } from '../../../event-buses/search-stack-event-bus';
import { User } from '../../../models/user';
import { Constants } from '../../../constants';
import * as moment from "moment";


@Component({
  selector: 'idm-attribute-search',
  templateUrl: './attribute-search.component.html',
  styleUrls: ['./attribute-search.component.css'],
  providers: [EntityService, UserService]
})
export class AttributeSearchComponent implements OnInit {
  @Input() xQuery: string;
  @Output() attributeQueryChanged = new EventEmitter();

  public title: string = 'AttributeSearchComponent';
  public freeTextSearch: string;
  public entityList: Entity[];
  public attributeList: Attribute[];
  public operatorList: Operation[];
  public valueSetList: Value[];
  public usersList: User[];
  public currentSearchStack: SearchStack;

  public operandString: string;
  public searchStyle: SearchStyleType;
  public selectedEntity: Entity;
  public selectedAttribute: Attribute;
  public selectedOperation: Operation;
  public selectedValue: Value;
  public selectedDateTime: string;
  public selectedTime: string;
  public selectedTimeStamp: string;
  public operandUserValue: string;
  public searchUserFormControl = new FormControl();

  public showStringInputForAttrSearch: boolean;
  public showDropDownListInputForAttrSearch: boolean;
  public showDateTimePickerForAttrSearch: boolean;
  public showTimePickerForAttrSearch: boolean;
  public showUserInputForAttrSearch: boolean;
  public isEditingSearchStack: boolean;

  constructor(public entityService: EntityService, public userService: UserService, public searchStackEventBus: SearchStackEventBus) {
    this.setSearchStyle(SearchStyleType.String); // intialize my search style to string.
    this.subscribeToEditStackEvent();
    this.initializeTypeAheadUserSearching();
  }

  public ngOnInit() {
    this.populateEntitiesList();
  }

  public populateEntitiesList(){
    //When this control starts, go get the entities.
    this.entityService.getList<Entity>().subscribe(entities => {
      this.entityList = entities;
    }, err => console.log(`There was an error getting the entities for attribute search control:${err}`));
  }

  public initializeTypeAheadUserSearching(){
    this.searchUserFormControl.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(userSearchString => { 
        this.userService.search(userSearchString, 20).subscribe(users => {
        if(users){
          this.usersList = users;
          this.operandUserValue = userSearchString;
        }}, err => console.log(`There was an error getting users for type ahead search:${err}`))
      });
  }

  public subscribeToEditStackEvent() {
    this.searchStackEventBus.searchStackEdited$.subscribe((searchStack) => {
      this.selectedEntity = searchStack.entity;
      this.onSelectedEntityChanged(searchStack.entity);

      this.selectedAttribute = searchStack.attribute;
      this.onSelectedAttributeChanged(searchStack.attribute);

      this.selectedOperation = this.operatorList.find((operator) => {
        return operator.operationType == searchStack.operation.operationType;
      });
      this.freeTextSearch = searchStack.freeTextSearchOperand;

      this.setOperand(searchStack.operand);

      this.isEditingSearchStack = true;
      this.currentSearchStack = searchStack;
    });
  }
  
  public onClickSearch() {
    this.xQuery = new xQueryBuilder().withConfig({
      entity: this.selectedEntity,
      attribute: this.selectedAttribute,
      operation: this.selectedOperation, 
      operand: this.getOperand(), //this will get the value out of dropdown/textbox/datepicker for us
      freeTextSearchOperand: this.freeTextSearch,
      searchStacks: this.searchStackEventBus.searchStacks,
    }).build();
    this.attributeQueryChanged.emit(this.xQuery);
  }

  public onClickSaveStack(){
    let stackToSave = this.getSearchStackFromUI();
    stackToSave.id = this.currentSearchStack.id;

    this.searchStackEventBus.saveSearchStack(stackToSave);
    this.isEditingSearchStack = false;
  }

  public onClickAddStack(){
    this.searchStackEventBus.addSearchStack(this.getSearchStackFromUI());
  }

  public getSearchStackFromUI(): SearchStack{
      return new SearchStack(
      this.selectedEntity,
      this.selectedAttribute,
      this.selectedOperation,
      this.getOperand(),
      this.freeTextSearch,
      //If the type of search is a value set, we need to pass in the human readable text
      this.searchStyle == SearchStyleType.ValueSet ? this.selectedValue.desc : '',
    );
  }

  public onClickCancel(){
    this.selectedEntity = undefined;
    this.freeTextSearch = '';
    this.resetUIControls(true,true);
    this.isEditingSearchStack = false;
  }

  public onSelectedEntityChanged(entity: Entity) {
    this.resetUIControls(true,true);
    if (entity && entity.attrs) {
      //Here we need to load the attr list from the entity, and populate the attribute drop down list
      this.attributeList = EntityUtility.BuildComprehensiveAttributes(entity).comprehensiveAttributes;
    }
  }

  public onSelectedAttributeChanged(attribute: Attribute) {
    this.resetUIControls(false,true);

    this.operatorList = new SearchOperationFactory().getOperations(attribute);

    if (attribute.isUserForSearching) {
      this.setSearchStyle(SearchStyleType.User);
    }
    else {
      switch (attribute.AttributeType) {
        case AttributeType.String:
        case AttributeType.Long:
        case AttributeType.Decimal:
        case AttributeType.Double:
        case AttributeType.MultiValue:
        case AttributeType.Short:
          this.setSearchStyle(SearchStyleType.String);
          break;
        case AttributeType.ValueSet:
          this.setSearchStyle(SearchStyleType.ValueSet);
          if (attribute && attribute.valueset && attribute.valueset) {
            this.valueSetList = attribute.valueset.value
          }
          break;
        case AttributeType.DateTime:
          this.setSearchStyle(SearchStyleType.DateTime);
          break;
        case AttributeType.Time:
          this.setSearchStyle(SearchStyleType.Time);
          break;
        case AttributeType.Timestamp:
          this.setSearchStyle(SearchStyleType.Timestamp);
          break;
        case AttributeType.Boolean:
          this.setSearchStyle(SearchStyleType.Boolean);
          break;
        default:
          break;
      }
    }
  }

  public resetUIControls(resetAttributeControls: boolean, resetAttributeChildControls: boolean) {
    if (resetAttributeControls) {
      this.setSearchStyle(SearchStyleType.String);
      this.selectedAttribute = undefined;
      this.attributeList = undefined;
    }
    if (resetAttributeChildControls) {
      this.selectedOperation = undefined;
      this.operatorList = undefined;
      this.selectedValue = undefined;
      this.valueSetList = undefined;
      this.selectedDateTime = moment().format(Constants.SOHO_DATEPICKER_DATE_FORMAT); //SOHO Date pickers don't work well with undefined.
      this.selectedTime = moment().format(Constants.SOHO_TIMEPICKER_TIME_FORMAT);
      this.selectedTimeStamp = moment().format(Constants.SOHO_DATEPICKER_DATE_FORMAT);
      this.searchUserFormControl.setValue('');
      this.operandUserValue = '';
      this.usersList = [];
    }
  }

  // We need to get the current search operand based on the style of search
  // 
  public getOperand(): string {
    switch (this.searchStyle) {
      case SearchStyleType.String:
      case SearchStyleType.MultiValue:
        return this.operandString;
      case SearchStyleType.ValueSet:
        return this.selectedValue.name;
      case SearchStyleType.Timestamp:
      case SearchStyleType.DateTime:
        return this.selectedDateTime.toString();
      case SearchStyleType.Time:
        return this.selectedTime.toString();
      case SearchStyleType.User:
        return this.operandUserValue;
      default:
        break;
    }
  }

  public setOperand(operand: string) {
    switch (this.searchStyle) {
      case SearchStyleType.String:
      case SearchStyleType.MultiValue:
        this.operandString = operand;
        break;
      case SearchStyleType.ValueSet:
        this.selectedValue = this.valueSetList.find((valueSetItem) => {
          return valueSetItem.name == operand;
        });
        break;
      case SearchStyleType.Timestamp:
      case SearchStyleType.DateTime:
        this.selectedDateTime = operand;
        break;
      case SearchStyleType.Time:
        this.selectedTime = operand;
        break;
      case SearchStyleType.User:
        this.searchUserFormControl.setValue(operand);
        break;
      default:
        break;
    }
  }

  // We need a meethod to change the search category, so that we can properly change 
  // visibilty on controls that get switched out when we change the category type.
  public setSearchStyle(searchStyleType: SearchStyleType) {
    this.searchStyle = searchStyleType;

    this.showStringInputForAttrSearch = (this.searchStyle == SearchStyleType.String || this.searchStyle == SearchStyleType.MultiValue);
    this.showDropDownListInputForAttrSearch = this.searchStyle == SearchStyleType.ValueSet;
    this.showDateTimePickerForAttrSearch = this.searchStyle == SearchStyleType.DateTime || this.searchStyle == SearchStyleType.Timestamp;
    this.showTimePickerForAttrSearch = this.searchStyle == SearchStyleType.Time;
    this.showUserInputForAttrSearch = this.searchStyle == SearchStyleType.User;
  }
}


