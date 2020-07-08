import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CSVFileService } from 'src/app/services/csvfile.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { CSVFile } from 'src/app/models/csvfile';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  csvFiles: Array<CSVFile> = new Array<CSVFile>();

  constructor(private configurationService: ConfigurationService,
    private csvFileService: CSVFileService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.csvFileService.getAllUploadedCSVFiles().subscribe(
      data => this.csvFiles = data
    );
  }

  onDownloadClicked(id: string) {
    this.csvFileService.download(id).subscribe(
      response => this.downloadFile(response));
  }

  downloadFile(data: any) {
    const blob = new Blob([data.body], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const save = window.open(url);

    if (!save || save.closed || typeof save.closed === 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }

    // if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE
    //   window.navigator.msSaveOrOpenBlob(data.file, data.filename);
    //   window.navigator.msSaveOrOpenBlob(data.file, data.filename);
    // } else { // Chrome & Firefox
    //   const a = document.createElement('a');
    //   const url = window.URL.createObjectURL(data.file);
    //   a.href = url;
    //   a.download = data.filename;
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    //   a.remove();
    // }
  }

  goHome() {
    this.router.navigateByUrl('');
  }
}
