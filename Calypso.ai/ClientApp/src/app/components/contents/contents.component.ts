import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Papa, ParseResult } from 'ngx-papaparse';

import { CSVFileService } from 'src/app/services/csvfile.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { CSVFile } from 'src/app/models/csvfile';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent implements OnInit {
  csvFiles: Array<CSVFile> = new Array<CSVFile>();
  parseResult: ParseResult = null;
  private _fileContents: string = null;

  constructor(private configurationService: ConfigurationService,
    private csvFileService: CSVFileService,
    private router: Router) {
  }

  ngOnInit() {
    this.csvFileService.getAllUploadedCSVFiles().subscribe(
      data => this.csvFiles = data
    );
  }

  set selectedFileContents(val: string) {
    this._fileContents = val;
  }

  get selectedFileContents(): string {
    return this._fileContents;
  }

  getCSVFileContents(selectedCsvFileId: string) {
    if (selectedCsvFileId !== '0') {
      this.selectedFileContents = 'Loading...Please wait';
      this.csvFileService.download(selectedCsvFileId).subscribe(
        response => this.displayFileContents(response));
    }
  }

  displayFileContents(data: any) {
    const blob = new Blob([data.body], { type: 'text/csv' });
    const reader = new FileReader();
    reader.onload = () => {
      console.log('finished loading contents');
      this.selectedFileContents = <string>reader.result;
    };
    reader.readAsText(blob);
  }

  goHome() {
    this.router.navigateByUrl('');
  }
}
