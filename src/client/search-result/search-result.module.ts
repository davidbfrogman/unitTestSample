import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SohoComponentsModule } from '@infor/sohoxi-angular';

import { SearchResultService } from './search-result.service';

import { SharedClientModule } from '../shared-client/shared-client.module';
import { SearchResultComponent } from './search-result.component';
import { CardListComponent } from './card-list/card-list.component';
import { DetailListComponent } from './detail-list/detail-list.component';
import { ThumbnailListComponent } from './thumbnail-list/thumbnail-list.component';
import { ListViewSelectorComponent } from './list-view-selector/list-view-selector.component';


@NgModule({
  imports: [
    CommonModule,
    SohoComponentsModule,
    FormsModule,
    SharedClientModule
  ],
  exports: [
    SearchResultComponent
  ],
  declarations: [SearchResultComponent, CardListComponent, DetailListComponent, ThumbnailListComponent, ListViewSelectorComponent],
  providers: [SearchResultService]
})
export class SearchResultModule { }


