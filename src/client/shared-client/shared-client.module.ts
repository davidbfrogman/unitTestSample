import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SohoComponentsModule } from '@infor/sohoxi-angular';

import { ActionMenuComponent } from './action-menu/action-menu.component';

@NgModule({
  imports: [
    CommonModule,
    SohoComponentsModule,
    FormsModule
  ],
  exports: [
    ActionMenuComponent
  ],
  declarations: [ActionMenuComponent],
  providers: []
})
export class SharedClientModule { }


