import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { HttpModule } from '@angular/http';
import { SohoIconModule} from '@infor/sohoxi-angular';
import { AppRoutes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';
import { ClientModule } from '../client/client.module';
import { RelatedinformationModule } from '../relatedinformation/relatedinformation.module';
import { ItemService } from '../services/item.service';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutes,
    ClientModule,
    RelatedinformationModule,
    SohoIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ItemService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
