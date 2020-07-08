import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsDisplayComponent } from './contents-display.component';

describe('ContentsDisplayComponent', () => {
  let component: ContentsDisplayComponent;
  let fixture: ComponentFixture<ContentsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
