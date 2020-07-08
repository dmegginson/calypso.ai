import { ContentsDisplayComponent } from './contents-display/contents-display.component';
import { UploadComponent } from './upload/upload.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DownloadComponent } from './download/download.component';
import { ContentsComponent } from './contents/contents.component';
import { HomeComponent } from './home/home.component';

export * from './home/home.component';
export * from './contents/contents.component';
export * from './download/download.component';
export * from './statistics/statistics.component';
export * from './upload/upload.component';
export * from './contents-display/contents-display.component';

export const COMPONENTS = [
  HomeComponent,
  ContentsComponent,
  DownloadComponent,
  StatisticsComponent,
  UploadComponent,
  ContentsDisplayComponent,
];
