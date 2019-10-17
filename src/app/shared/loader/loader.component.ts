import { Component, OnInit, ChangeDetectorRef, AfterContentChecked, ChangeDetectionStrategy } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit, AfterContentChecked {

  loading: boolean;

  constructor(private loaderService: LoaderService, private changeDedectionRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
  }

  ngAfterContentChecked(): void {
    this.changeDedectionRef.detectChanges();
  }

}
