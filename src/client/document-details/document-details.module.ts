import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SohoComponentsModule } from '@infor/sohoxi-angular';

import { DocumentDetailsComponent} from './document-details.component';
import { PreviewComponent } from './preview/preview.component';
import { SharedClientModule } from '../shared-client/shared-client.module';
import { DocumentDetailTabsComponent } from './document-detail-tabs/document-detail-tabs.component';

@NgModule({
  imports: [
    CommonModule,
    SohoComponentsModule,
    FormsModule,
    SharedClientModule
  ],
  exports: [
    DocumentDetailsComponent
  ],
  declarations: [DocumentDetailsComponent,
    PreviewComponent, DocumentDetailTabsComponent],
  providers: []
})
export class DocumentDetailsModule { }


