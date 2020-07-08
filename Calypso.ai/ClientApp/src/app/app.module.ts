import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import {
  COMPONENTS,
  HomeComponent,
  UploadComponent,
  DownloadComponent,
  ContentsComponent,
  StatisticsComponent,
  ContentsDisplayComponent
} from './components/index';

import { RESOLVES, CSVFilesResolve, StatisticsResolve } from './resolves/index';

@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      }, {
        path: 'upload',
        component: UploadComponent,
        pathMatch: 'full'
      }, {
        path: 'download',
        component: DownloadComponent,
        pathMatch: 'full',
        runGuardsAndResolvers: 'always',
        resolve: { csvFiles: CSVFilesResolve }
      }, {
        path: 'contents',
        component: ContentsComponent,
        pathMatch: 'full',
        runGuardsAndResolvers: 'always',
        resolve: { csvFiles: CSVFilesResolve }
      }, {
        path: 'statistics',
        component: StatisticsComponent,
        pathMatch: 'full',
        runGuardsAndResolvers: 'always',
        resolve: { statistics: StatisticsResolve }
      }
    ])
  ],
  providers: [
    RESOLVES
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
