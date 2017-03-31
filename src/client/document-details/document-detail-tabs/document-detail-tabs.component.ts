import { Component, Input } from '@angular/core';
import { Item } from 'models/item';

@Component({
  selector: 'idm-document-detail-tabs',
  templateUrl: './document-detail-tabs.component.html',
  styleUrls: ['./document-detail-tabs.component.css']
})
export class DocumentDetailTabsComponent {
  @Input() item: Item;

  public title: string = 'DocumentDetailTabsComponent';

}
