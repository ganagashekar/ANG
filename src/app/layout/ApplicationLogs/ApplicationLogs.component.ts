import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { ApplicationLogsFilter } from 'src/app/Model/FilterModels/ApplicationLogsFilter';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { ApplicationLogsModel } from 'src/app/Model/ServiceResposeModel/CommonModel/ApplicationLogsModel';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { ApplicationLogsService } from 'src/app/shared/services/ApplicationLogs.service';
import { LogEditTemplateComponent } from 'src/app/layout/gridEditorTemplates/logEditTemplate/logEditTemplate.Component';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-ApplicationLogs',
  templateUrl: './ApplicationLogs.component.html',
  styleUrls: ['./ApplicationLogs.component.scss']
})
export class ApplicationLogsComponent implements OnInit , AfterViewInit  {
  ApplicationLogsFilter: ApplicationLogsFilter;
  ApplicationLogsListDataSource: MatTableDataSource<ApplicationLogsModel>;
  displayedColumns: string[] = [
     'editAction', 'logID', 'confgID', 'errorCode', 'createts', 'deleteAction',
   ];


   receivedChildMessage: string;

   @ViewChild(MatSort, { static: false }) sort: MatSort;
   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

   constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _ApplicationLogsservices: ApplicationLogsService,
    private snackBar: MatSnackBar) {
      _appcomponent.currenturl = '/ApplicationLogs';
      this.ApplicationLogsListDataSource = new MatTableDataSource<ApplicationLogsModel>();
      this.ApplicationLogsFilter = new ApplicationLogsFilter();
    }

  ngOnInit() {
    this.getAllApplicationLogsinfoList ();
  }

  ngAfterViewInit(): void {
    this.ApplicationLogsListDataSource.sort = this.sort;
    this.ApplicationLogsListDataSource.paginator = this.paginator;
  }

  getAllApplicationLogsinfoList(): void {
    this.ApplicationLogsFilter.LogId = this._appcomponent.logID;
    this.ApplicationLogsFilter.ConfgId = this._appcomponent.confgID;
    this._ApplicationLogsservices.getAllApplicationLogsinfoList(this.ApplicationLogsFilter).subscribe(resp => {
     this.ApplicationLogsListDataSource.data = resp.model as ApplicationLogsModel[];
   }, error => {
     console.log('Error: ' + error);
   });
  }

NewApplicationLogs(): void {
  const dialogRef = this._dialog.open( LogEditTemplateComponent, {
    width: '500px',
    data: { action: 'add',  ApplicationLogsModel }
  });
  dialogRef.componentInstance. ApplicationLogsEditorEmitter.subscribe((response: any) => {
    // if (response.model > 0) {
      // this.getAllParameterList();
      this.showSnackBar('logs details added Successfully.');    // } else {
    //  this.showSnackBar(response.message, true);
    // };
  });
 }

 editlogs(Scheduler: ApplicationLogsModel): void {
  const dialogRef = this._dialog.open(LogEditTemplateComponent, {
    width: '500px',
    data: { action: 'edit', Scheduler }
  });
  dialogRef.componentInstance.ApplicationLogsEditorEmitter.subscribe((response: any) => {
 // if (response.model > 0) {
    // this. getAllErrorCodeList();
    this.showSnackBar('Application logs Updated Successfully.');
  // } else {
// this.showSnackBar('Error occurred while updating the Parameter.', true);
  // }
  });
}

 deleteApplicationlog(logID: bigint, ): void {
  const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
    width: '420px',
    data: { Title: 'Confirm', Message: 'Are you sure want to delete this Audit ?' }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this._ApplicationLogsservices.deleteApplicationlog(logID).subscribe((response: any) => {
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

