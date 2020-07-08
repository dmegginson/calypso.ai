import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private configurationService: ConfigurationService,
    private router: Router) { }

  ngOnInit() {
  }

  upload() {
    this.router.navigateByUrl(`/upload`);
  }

  download() {
    this.router.navigateByUrl(`/download`);
  }

  contents() {
    this.router.navigateByUrl(`/contents`);
  }

  statistics() {
    this.router.navigateByUrl(`/statistics`);
  }

  // onDownloadClicked(id: string) {
  //   this.csvFileService.download(id).subscribe(
  //     response => this.downloadFile(response));

  // }

  // downloadFile(data: any) {
  //   const blob = new Blob([data], { type: 'text/csv' });
  //   const url = window.URL.createObjectURL(blob);
  //   const save = window.open(url);

  //   if (!save || save.closed || typeof save.closed === 'undefined') {
  //     alert('Please disable your Pop-up blocker and try again.');
  //   }
  // }

  // statistics() {
  //   this.router.navigateByUrl(`/statistics`);
  // }
}
