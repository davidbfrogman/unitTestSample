import { Component, Input } from '@angular/core';
import { ItemService } from 'services/item.service';
import { Item } from 'models/item';

@Component({
  selector: 'idm-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css'],
  providers: [ItemService]
})
export class DocumentDetailsComponent {
  @Input() pid: string;

  public title: string = 'DocumentDetailsComponent';
  public item: Item;

  constructor(private itemService: ItemService) { }

  public ngOnInit() {
    if(this.pid) {
      this.getItem(this.pid);
    }
  }

  public getItem(pid: string) {
    this.itemService.get<Item>(pid).subscribe((itemResult: Item) => {
      this.item = itemResult;
    }, err => console.log(`There was an error getting a specific item:${err}`));
  }
}
