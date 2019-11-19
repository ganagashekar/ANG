import { Component, OnInit , AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { ErrorCodeFilter } from 'src/app/Model/FilterModels/ErrorCodeFilter';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { ErrorCodeModel } from 'src/app/Model/ServiceResposeModel/Setups/ErrorCodeModel';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { ErrorCodeService } from 'src/app/shared/services/ErrorCode.services';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-errorcodes',
  templateUrl: './errorcodes.component.html',
  styleUrls: ['./errorcodes.component.scss']
})
export class ErrorcodesComponent implements OnInit {
  ErrorCodeFilter: ErrorCodeFilter;
  stacksArray: ReferenceRecords[] = [];
  ErrorCodeListDataSource: MatTableDataSource<ErrorCodeModel>;
  displayedColumns: string[] = [
     'errorcode', 'errordesc', 'updt_ts', 'deleteAction'
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

 deleteerrorcode(errorcode: string): void {
  const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
    width: '420px',
    data: { Title: 'Confirm', Message: 'Are you sure want to delete this ErrorCode ?' }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this._errorcodeservices.deleteerrorcode(errorcode).subscribe((response: any) => {
        if (response.model) {
        this. getAllErrorCodeList();
          this.showSnackBar('Errorcode Deleted Successfully.');
       } else {
        this.showSnackBar('Error occurred while deleting the Errorcode.', true);
        }
        this.showSnackBar(response.message);
      }, error => {
        console.log('Error: ' + error);
      });
    }
  });
}
showSnackBar(message: string, isError: boolean = false): void {
  if (isError) {
    this.snackBar.open(message, 'Ok');
  } else {
    this.snackBar.open(message, 'Ok', {
      duration: 3000
    });
  }
}
}
