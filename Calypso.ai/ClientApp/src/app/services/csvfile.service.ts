import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { CSVFile } from './../models/csvfile';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class CSVFileService {

  private readonly endpoint: string = 'csvfile';

  constructor(private configurationService: ConfigurationService,
    private http: HttpClient) {
  }

  upload(formData: FormData): Observable<boolean> {

    const url = `${this.configurationService.getAPIUrl()}/${this.endpoint}`;

    return this.http.post(url, formData)
      .pipe(map(() => true));
  }

  download(id: string) {
    const url = `${this.configurationService.getAPIUrl()}/${this.endpoint}/download/${id}`;

    return this.http.get(url, {
      observe: 'response',
      responseType: 'arraybuffer'
    });
  }

  getAllUploadedCSVFiles(): Observable<CSVFile[]> {
    const url = `${this.configurationService.getAPIUrl()}/${this.endpoint}`;

    return this.http.get(url).pipe(
      map((data: CSVFile[]) => data.map(csvFile => new CSVFile(csvFile)), share()));
  }
}
