import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SohoComponentsModule } from '@infor/sohoxi-angular';

import { SearchModule } from './search/search.module';
import { SearchResultModule} from './search-result/search-result.module';
import { DocumentDetailsModule} from './document-details/document-details.module';
import { ControlCenterModule} from './control-center/control-center.module';

import { ClientComponent } from './client.component';
import { ServiceUtilityComponent } from '../client/service-utility/service-utility.component';


@NgModule({
  declarations: [
    ClientComponent,
    ServiceUtilityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    SohoComponentsModule,
    SearchModule,
    SearchResultModule,
    DocumentDetailsModule,
    ControlCenterModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class ClientModule { }
