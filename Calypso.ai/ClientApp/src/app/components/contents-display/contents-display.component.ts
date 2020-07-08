import { Router } from '@angular/router';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-contents-display',
  templateUrl: './contents-display.component.html',
  styleUrls: ['./contents-display.component.css']
})
export class ContentsDisplayComponent implements OnInit {
  private _fileContents = '';

  @Input()
  set content(val: string) {
    this._fileContents = val;
    this.changeDetectorRef.detectChanges();
  }

  constructor(private changeDetectorRef: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit() {
  }

  get fileContents(): string { return this._fileContents; }

  goHome() {
    this.router.navigateByUrl('');
  }
}
