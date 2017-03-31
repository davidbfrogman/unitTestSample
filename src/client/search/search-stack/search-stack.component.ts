import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Entity, EntityUtility } from '../../../models/entity';
import { Attribute, AttributeUtility, Value } from '../../../models/attribute';
import { SearchStyleType, AttributeType, OperationType } from '../../../enumerations';
import { xQueryBuilder } from '../../../utility/builder/xQueryBuilder';
import { SearchOperationFactory } from '../search-operation-factory';
import { SearchStack } from '../../../models/search-stack';
import { SearchStackEventBus } from '../../../event-buses/search-stack-event-bus';
import { User } from '../../../models/user';
import { Constants } from '../../../constants';
import * as moment from "moment";


@Component({
  selector: 'idm-search-stack',
  templateUrl: './search-stack.component.html',
  styleUrls: ['./search-stack.component.css']
})
export class SearchStackComponent implements OnInit {
  public title: string = 'SearchStackComponent';

  // The search stack event bus is where we get our current list of search stacks that we can bind to.
  constructor(private searchStackEventBus: SearchStackEventBus) {
  }

  ngOnInit() {
  }

  private onDeleteStack(searchStack: SearchStack) {
    // This will send out a search stack onto the service bus for anyone who is subscribed 
    // to the delete observable 
    this.searchStackEventBus.deleteSearchStack(searchStack);
  }

  private onEditStack(searchStack: SearchStack){
    // This will send out a search stack to anyone who is subscribed to the 
    // edit stack search observable
    this.searchStackEventBus.editSearchStack(searchStack);
  }
}
