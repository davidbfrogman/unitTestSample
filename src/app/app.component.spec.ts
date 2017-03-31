import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';
import { AppRoutes } from './app.routes';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { SohoIconModule} from '@infor/sohoxi-angular';
import { ClientModule } from '../client/client.module';
import { RelatedinformationModule } from '../relatedinformation/relatedinformation.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PageNotFoundComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutes,
        ClientModule,
        RelatedinformationModule,
        SohoIconModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component    = fixture.componentInstance;
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

 it(`should have as title 'AppComponent'`, async(() => {
    expect(component.title).toEqual('AppComponent');
  }));

  it(`should render title 'AppComponent' in a h1 tag`, async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toEqual(component.title);
  }));
});
