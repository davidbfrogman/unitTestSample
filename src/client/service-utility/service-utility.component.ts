import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SohoTextAreaComponent, SohoFileUploadComponent } from '@infor/sohoxi-angular';
import { ItemService } from '../../services/item.service';
import { Item, Resources, Resource, Collumn, CollumnItem, ItemUtility } from '../../models/item';
import { Observable } from 'rxjs/Observable';
import { EntityService } from '../../services/entity.service';
import { Entity } from '../../models/entity';
import { environment } from '../../environments/environment';
import { EnvironmentType, ItemResourceType, AttributeType } from '../../enumerations';

@Component({
  selector: 'idm-service-utility',
  templateUrl: './service-utility.component.html',
  providers: [ItemService, EntityService]
})
export class ServiceUtilityComponent implements OnInit {

  @Input() fileName: string = '';
  @Output() xQueryChanged: EventEmitter<string> = new EventEmitter();

  public text = 'Upload a File';
  public name1 = 'file-name';
  //protected file: File;
  protected fileBase64: string;
  public status: string;
  public xQuery: string;
  public itemsList: Item[];
  public selectedItem: Item;
  public selectedThumbnail: string;
  public selectedEntity: Entity;
  public entityList : Entity[];
  public isDevelopment: boolean = environment.environmentType == EnvironmentType.Dev;


  public constructor(private itemService: ItemService, private entityService: EntityService){

  }

  public ngOnInit() {
    // TODO: Remove hardcoded search here
    // this.xQuery = '/Daves_MV_Attribute_Doc';
    this.xQuery = '/MDS_GenericDocument';
    this.getEntities();
  }
  
  public onSelectedEntityChange(entity: Entity){
    this.xQuery = `/${entity.name}`;
    this.xQueryChanged.emit(this.xQuery);
  }

  public getEntities(){
    this.entityService.getList<Entity>(null).subscribe(entities => {
      this.entityList = entities;
    }, err => console.log(`There was an error getting a specific item:${err}`));
  }

  public onClickSearch(): void {
    this.search();
  }

  public onClickSelect(item: Item): void {
    this.itemService.get<Item>(item.pid).subscribe((itemResult: Item) => {
      this.selectedItem = itemResult;
      try {
        this.selectedThumbnail = ItemUtility.getResourceUrl(this.selectedItem, ItemResourceType.Thumbnail);
      }
      catch (e) {
        //Empty catch if there's no resource it's not a big deal.
      }
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

  public onFileUploadChange(event: any): void {
    //  let fileList: FileList = event.target.files;
    //  if(fileList.length > 0) {
    //     this.file = fileList[0];
    //     const reader = new FileReader();
    //     let fileBase64: string = null;
    //     const _this = this;
    //     reader.onload = function (element) {
    //         _this.fileBase64 = reader.result.split(',')[1];
    //     };
    //     reader.readAsDataURL(this.file);
    //  }
  }

  public onClickUpload(): void {
    let myItem : Item = new Item();
    myItem.entityName = 'MDS_GenericDocument';

    //add resource
    ItemUtility.addResource(myItem, this.fileName, this.fileBase64);
    
    //add attributes 
    ItemUtility.addAttribute(myItem, 'MDS_EntityType', 'MDS_EntityType_1',AttributeType.String);
    ItemUtility.addAttribute(myItem, 'MDS_AccountingEntity', 'MDS_AccountingEntity_1', AttributeType.String);
    ItemUtility.addAttribute(myItem, 'MDS_Location', 'MDS_Location_1', AttributeType.String);
    ItemUtility.addAttribute(myItem, 'MDS_id1', 'MDS_id1_1', AttributeType.String);
    ItemUtility.addAttribute(myItem, 'MDS_id2', 'MDS_id2_1', AttributeType.String);
    
    //add multivalue attributes
    //ItemUtility.addAttribute(myItem, 'Multivalue\\Value', 'Multivalue2');

    this.itemService.create(myItem, { '$checkout': false }).subscribe((item: Item) => {
      this.status = `Just created a document with pid: ${item.pid}`;
    }, err => {
      this.status = `There was an error uploading the file: ${err}`;
      console.log(`err was:${err}`);
    });
  }
}
