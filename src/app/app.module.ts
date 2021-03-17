import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageComponent } from './pages/main/image/image.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { AgGridModule } from '@ag-grid-community/angular';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { RequestsService } from './shared/services/requests.service';
import { environment } from '../environments/environment';
// ----NgRx
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../app/Store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './Store/app.effects';

// ------
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';






ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ClipboardModule
]);



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ImageComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FormsModule,
    AgGridModule.withComponents([ImageComponent]),
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [RequestsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
