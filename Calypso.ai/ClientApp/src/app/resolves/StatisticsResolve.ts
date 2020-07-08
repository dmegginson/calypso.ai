import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Statistic } from '../models/statistic';
import { StatisticsService } from './../services/statistics.service';

@Injectable()
export class StatisticsResolve implements Resolve<Statistic[]> {

  constructor(private statisticsService: StatisticsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Statistic[]> {
    return this.statisticsService.getAllStatistics();
  }
}
