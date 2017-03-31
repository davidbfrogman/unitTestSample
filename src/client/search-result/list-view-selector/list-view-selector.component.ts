import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SohoToolbarComponent } from '@infor/sohoxi-angular';

@Component({
  selector: 'idm-list-view-selector',
  templateUrl: './list-view-selector.component.html',
  styleUrls: ['./list-view-selector.component.css']
})
export class ListViewSelectorComponent implements OnInit {
  public title: string = 'ListViewSelectorComponent';
  public static availableListViews= {'card': 'card', 'detail': 'detail', 'thumbnail': 'thumbnail'};
  @Output() listViewChanged = new EventEmitter();
  constructor() {

  }
  ngOnInit() { }

  private cardListSelected(): void {
    this.listViewChanged.emit( ListViewSelectorComponent.availableListViews.card);
  }
  private detailListSelected(): void {
    this.listViewChanged.emit( ListViewSelectorComponent.availableListViews.detail);
  }
  private thumbnailListSelected(): void {
    this.listViewChanged.emit( ListViewSelectorComponent.availableListViews.thumbnail);
  }
}
