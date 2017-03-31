import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SohoTextAreaComponent } from '@infor/sohoxi-angular';
import { SearchService } from '../search.service';
import { Item, ItemUtility } from 'models/item';
import { Entity } from 'models/entity';
import { ItemService } from 'services/item.service';
import { EntityService } from 'services/entity.service';
import { ItemResourceType } from '../../../enumerations';



@Component({
  selector: 'idm-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css'],
  providers: [ItemService, EntityService ]
})
export class AdvancedSearchComponent implements OnInit {
  @Input() xQuery: string = '/MDS_GenericDocument';
  @Output() xQueryChanged: EventEmitter<string> = new EventEmitter();
  @ViewChild(SohoTextAreaComponent) textarea: SohoTextAreaComponent;

  public itemsList: Item[];
  public selectedItem: Item;
  public selectedThumbnail: string;
  public selectedEntity: Entity;
  public entityList : Entity[];

  constructor(private itemService: ItemService, private entityService : EntityService) {

  }

  public ngOnInit() {
    this.getEntities();
  }

  public getEntities(){
    this.entityService.getList<Entity>(null).subscribe(entities => {
      this.entityList = entities['entity'];
    }, err => console.log(`There was an error getting a specific item:${err}`));
  }

  public onClickSearch(): void {
    this.search();
  }

  public onClickSelect(item: Item): void {
    this.itemService.get<Item>(item.pid).subscribe((itemResult: Item) => {
      this.selectedItem = itemResult;
      this.selectedThumbnail = ItemUtility.getResourceUrl(this.selectedItem, ItemResourceType.Thumbnail);
    }, err => console.log(`There was an error getting a specific item:${err}`));
  }

  public onClickDelete(item: Item) {
    this.itemService.delete(item.pid).subscribe(() => {
      console.log(`just deleted item.pid:${item.pid}`);

      if (this.selectedItem && this.selectedItem.pid === item.pid) { this.selectedItem = null; }

      // Refresh the list of documents, after deletion.
      this.search();
    }), err => console.log(`There was an error searching for items:${err}`);
  }

  private search(): void {
    this.itemService.search(this.xQuery, 0, 100).subscribe((items: Item[]) => {
      this.itemsList = items['item'];
    }, err => console.log(`There was an error searching for items:${err}`));

    this.xQueryChanged.emit(this.xQuery);
  }
}

