import { Component, OnInit, ViewChild, Input } from '@angular/core';

import {  SohoTextAreaComponent} from '@infor/sohoxi-angular';

import { SearchResultService } from './search-result.service';

import { ListViewSelectorComponent } from './list-view-selector/list-view-selector.component';


@Component({
  selector: 'idm-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
  providers: [],
})
export class SearchResultComponent {
  public title: string = 'SearchResultComponent';
  @ViewChild(SohoTextAreaComponent) textarea: SohoTextAreaComponent;
  @Input() xQuery;
  private isCardListSelected: Boolean = true;
  private isDetailListSelected: Boolean = false;
  private isThumbnailListSelected: Boolean = false;

  constructor() { }

  public listViewChanged(view: string): void {
    if (view === ListViewSelectorComponent.availableListViews.card) {
      this.isCardListSelected = true;
      this.isDetailListSelected = false;
      this.isThumbnailListSelected = false;
    } else if (view === ListViewSelectorComponent.availableListViews.detail) {
      this.isCardListSelected = false;
      this.isDetailListSelected = true;
      this.isThumbnailListSelected = false;
    } else if (view === ListViewSelectorComponent.availableListViews.thumbnail) {
      this.isCardListSelected = false;
      this.isDetailListSelected = false;
      this.isThumbnailListSelected = true;
    }
  }
}
