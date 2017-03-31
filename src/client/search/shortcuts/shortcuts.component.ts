import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'idm-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.css'],
  providers: [SearchService]
})
export class ShortcutsComponent {
 public QUERY_CHECKOUT_BY_ME: string = '/MDS_File';
 public QUERY_CREATED_BY_ME: string = '/MDS_GenericDocument';

  @Output() shortcutQueryChanged = new EventEmitter();

  constructor(private searchService: SearchService) {
  }

  public checkedOutByMeClicked() {
     this.shortcutQueryChanged.emit(this.QUERY_CHECKOUT_BY_ME);
  }
  public createdByMeClicked() {
     this.shortcutQueryChanged.emit(this.QUERY_CREATED_BY_ME);
  }
}
