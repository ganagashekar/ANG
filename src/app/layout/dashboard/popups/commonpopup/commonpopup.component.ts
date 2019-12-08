import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-commonpopup',
  templateUrl: './commonpopup.component.html',
  styleUrls: ['./commonpopup.component.scss']
})
export class CommonpopupComponent implements OnInit,AfterViewInit {
  displayedColumns = [];
  dataSource: MatTableDataSource<any>;
  Heading="";
  isLoading = false;
  data:any;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(public dialogRef: MatDialogRef<CommonpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any) { 

      this.dataSource =  new MatTableDataSource();
      this.displayedColumns =  _data.data.length > 0 ? Object.keys( _data.data[0]) : [];
      this.data = _data.data;
      this.Heading = _data.action;
    }

  ngOnInit() {
  }
  ngAfterViewInit() {

this.dataSource.data = this.data;
  // this.dataSource.sort = this.sort;
  // this.dataSource.paginator = this.paginator;
}
  onCloseClick(): void {
    this.dialogRef.close();
  }
}
