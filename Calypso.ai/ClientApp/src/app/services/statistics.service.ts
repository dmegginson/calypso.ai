import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { ConfigurationService } from './configuration.service';
import { Statistic } from '../models/statistic';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private readonly endpoint: string = 'statistics';

  constructor(private configurationService: ConfigurationService,
    private http: HttpClient) {
  }

  getAllStatistics(): Observable<Statistic[]> {
    const url = `${this.configurationService.getAPIUrl()}/${this.endpoint}`;

    return this.http.get(url).pipe(
      map((data: Statistic[]) => data.map(statistic => new Statistic(statistic)), share()));
  }

  getAllStatisticsForCSVFile(id: string): Observable<Statistic[]> {
    const url = `${this.configurationService.getAPIUrl()}/${this.endpoint}/id`;

    return this.http.get(url).pipe(
      map((data: Statistic[]) => data.map(statistic => new Statistic(statistic)), share()));
  }
}
