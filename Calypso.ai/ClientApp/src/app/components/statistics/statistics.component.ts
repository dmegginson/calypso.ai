import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigurationService } from 'src/app/services/configuration.service';
import { StatisticsService } from 'src/app/services/statistics.service';

import { Statistic } from './../../models/statistic';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  statistics: Statistic[] = null;

  constructor(private configurationService: ConfigurationService,
    private statisticsService: StatisticsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.statistics = this.route.snapshot.data['statistics'];
  }

  goHome() {
    this.router.navigateByUrl('');
  }
}
