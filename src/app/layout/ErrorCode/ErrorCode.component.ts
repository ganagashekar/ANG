import { Component, OnInit , AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { ErrorCodeFilter } from 'src/app/Model/FilterModels/ErrorCodeFilter';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { ErrorCodeModel } from 'src/app/Model/ServiceResposeModel/Setups/ErrorCodeModel';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { ErrorCodeService } from 'src/app/shared/services/ErrorCode.services';


@Component({
  selector: 'app-ErrorCode',
  templateUrl: './ErrorCode.component.html',
  styleUrls: ['./ErrorCode.component.scss']
})
export class ErrorCodeComponent implements OnInit , AfterViewInit{
  ErrorCodeFilter: ErrorCodeFilter;
  stacksArray: ReferenceRecords[] = [];
  ErrorCodeListDataSource: MatTableDataSource<ErrorCodeModel>;
  displayedColumns: string[] = [
     'errorcode', 'errordesc', 'updt_ts'
  ];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _errorcodeservices: ErrorCodeService,
    private snackBar: MatSnackBar) {
      _appcomponent.currenturl = '/Error';
      this.ErrorCodeListDataSource = new MatTableDataSource<ErrorCodeModel>();
      this.ErrorCodeFilter = new ErrorCodeFilter();
    }
  ngOnInit() {
    this.getAllErrorCodeList();
  }

  ngAfterViewInit(): void {
    this.ErrorCodeListDataSource.sort = this.sort;
    this.ErrorCodeListDataSource.paginator = this.paginator;
  }

  getAllErrorCodeList(): void {
    this.ErrorCodeFilter.error_code = this._appcomponent.ErrorCode;
    this._errorcodeservices.getAllErrorCodeList(this.ErrorCodeFilter).subscribe(resp => {
     this.ErrorCodeListDataSource.data = resp.model as ErrorCodeModel[];
   }, error => {
     console.log('Error: ' + error);
   });

 }

}
