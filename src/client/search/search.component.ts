import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AttributeSearchComponent } from './attribute-search/attribute-search.component';
import { SearchService } from './search.service';
import { SearchStackEventBus } from '../../event-buses/search-stack-event-bus';

@Component({
  selector: 'idm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService, SearchStackEventBus]
})
export class SearchComponent {
  public title: string = 'SearchComponent';
  @Input() xQuery;
  @Output() searchChanged = new EventEmitter();

  constructor(private searchService: SearchService, private searchStackEventBus: SearchStackEventBus) {
  }

  searchQueryChanged(xQuery: string) {
    this.xQuery = xQuery;
    this.searchChanged.emit(this.xQuery);
  }
}
