import { Component, OnInit } from '@angular/core';
import { SohoTabsComponent } from '@infor/sohoxi-angular';
import { environment } from '../environments/environment';

@Component({
  selector: 'idm-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent {
  public title: string = 'ClientComponent';
  public development = (environment.production === false);

  private xQuery = 'client';

  private tabsData: Array<any> =
    [
        { id: 'item1', title: 'item1', content: 'Item 1 data', pid: 'MDS_File-1-1-LATEST' }, // tslint:disable-line
        { id: 'item2', title: 'item2', content: 'Item 2 data', pid: 'MDS_File-2-1-LATEST' }, // tslint:disable-line
        { id: 'item3', title: 'item3', content: 'Item 3 data', pid: 'MDS_File-3-1-LATEST' } // tslint:disable-line
    ];

  searchChanged(query: string) {
    this.xQuery = query;
  }
  onTabActivated(tab) {
    console.log(tab + ' TabsBasicDemoComponent.onTabActivated');
  }
}
