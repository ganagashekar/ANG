import { Component, OnInit , AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { ErrorCodeSetupFilter } from 'src/app/Model/FilterModels/ErrorCodeSetupFilter';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { ErrorCodeSetupModel } from 'src/app/Model/ServiceResposeModel/Setups/ErrorCodeSetupModel';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { ErrorCodeSetupService } from 'src/app/shared/services/ErrorCodeSetup.service';
import { ErrorCodeEditTemplateComponent } from 'src/app/layout/gridEditorTemplates/ErrorCodeEditTemplate/ErrorCodeEditTemplate.Component';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-errorcodesetup',
  templateUrl: './ErrorCodeSetup.component.html',
  styleUrls: ['./ErrorCodeSetup.component.scss']
})
export class ErrorCodeSetupComponent implements OnInit , AfterViewInit {
  ErrorCodeFilter: ErrorCodeSetupFilter;
  stacksArray: ReferenceRecords[] = [];
  ErrorCodeListDataSource: MatTableDataSource<ErrorCodeSetupModel>;
  displayedColumns: string[] = [
     'editAction', 'errorcode', 'errordesc', 'updt_ts', 'deleteAction'
  ];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _errorcodeservices: ErrorCodeSetupService,
    private snackBar: MatSnackBar) {
      _appcomponent.currenturl = '/ErrorCodeSetup';
      this.ErrorCodeListDataSource = new MatTableDataSource<ErrorCodeSetupModel>();
      this.ErrorCodeFilter = new ErrorCodeSetupFilter();
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
     this.ErrorCodeListDataSource.data = resp.model as ErrorCodeSetupModel[];
   }, error => {
     console.log('Error: ' + error);
   });

 }

 editErrorCode(Scheduler: ErrorCodeSetupModel): void {
  const dialogRef = this._dialog.open(ErrorCodeEditTemplateComponent, {
    width: '500px',
    data: { action: 'edit', Scheduler }
  });
  dialogRef.componentInstance.errorCodeEditorEmitter.subscribe((response: any) => {
 // if (response.model > 0) {
    // this. getAllErrorCodeList();
    this.showSnackBar('ErrorCode Updated Successfully.');
  // } else {
// this.showSnackBar('Error occurred while updating the Parameter.', true);
  // }
  });
}

 NewErrorCode(): void {
  const dialogRef = this._dialog.open(ErrorCodeEditTemplateComponent, {
    width: '500px',
    data: { action: 'add', ErrorCodeSetupModel }
  });
  dialogRef.componentInstance.errorCodeEditorEmitter.subscribe((response: any) => {
    // if (response.model > 0) {
      // this.getAllParameterList();
      this.showSnackBar('Errorcode added Successfully.');    // } else {
    //  this.showSnackBar(response.message, true);
    // };
  });
 }

 DeleteErrorCode(errorcode: string): void {
  const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
    width: '420px',
    data: { Title: 'Confirm', Message: 'Are you sure want to delete this Parameter ?' }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this._errorcodeservices.DeleteErrorCode(errorcode).subscribe((response: any) => {
       // if (response.model) {
          // this. getAllParameterList();
          // this.showSnackBar('Scheduled Parameter Deleted Successfully.');
       // } else {
        // this.showSnackBar('Error occurred while deleting the Parameter.', true);
       // }
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
