
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CSVFile } from '../models/csvfile';
import { CSVFileService } from './../services/csvfile.service';

@Injectable()
export class CSVFilesResolve implements Resolve<CSVFile[]> {

  constructor(private csvFileService: CSVFileService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CSVFile[]> {
    return this.csvFileService.getAllUploadedCSVFiles();
  }
}
