import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from '../client/client.component';
import { RelatedinformationComponent } from '../relatedinformation/relatedinformation.component';
import { SearchComponent } from '../client/search/search.component';
import { PageNotFoundComponent } from './not-found.component';

const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const AppRoutes = RouterModule.forRoot(routes);
