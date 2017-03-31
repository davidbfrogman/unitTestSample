import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ClientComponent } from './client.component';
import { ServiceUtilityComponent } from '../client/service-utility/service-utility.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SohoComponentsModule } from '@infor/sohoxi-angular';

import { SearchModule } from './search/search.module';
import { SearchResultModule} from './search-result/search-result.module';
import { DocumentDetailsModule} from './document-details/document-details.module';
import { ControlCenterModule} from './control-center/control-center.module';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
        ControlCenterModule
      ]
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientComponent);
    component    = fixture.componentInstance;
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'ClientComponent'`, async(() => {
    expect(component.title).toEqual('ClientComponent');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('ClientComponent');
  }));
});
