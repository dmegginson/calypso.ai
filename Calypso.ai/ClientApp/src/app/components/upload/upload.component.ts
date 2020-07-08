import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CSVFileService } from 'src/app/services/csvfile.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { CSVFile } from 'src/app/models/csvfile';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  hasHeaders = false;

  selectedFile: File = null;
  uploadForm: FormGroup;

  csvFiles: Array<CSVFile> = new Array<CSVFile>();

  constructor(private configurationService: ConfigurationService,
    private csvFileService: CSVFileService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.uploadForm = new FormGroup({
      HasHeaders: new FormControl(null),
      File: new FormControl(null)
    });
  }

  onChange(isChecked: boolean) {
    this.hasHeaders = isChecked;
  }

  onFileSelect(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
  }

  onUpload(data) {
    const formData = new FormData();
    formData.append('HasHeaders', String(this.hasHeaders));
    formData.append('File', this.selectedFile);

    this.csvFileService.upload(formData).subscribe(
      (res) => alert('File uploaded successfully.'),
      (err) => console.log('Error occurred while uploading file.')
    );

    this.uploadForm.reset();
  }

  goHome() {
    this.router.navigateByUrl('');
  }
}
