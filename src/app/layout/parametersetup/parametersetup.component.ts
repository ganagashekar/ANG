import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { ParameterFilter } from 'src/app/Model/FilterModels/ParameterFilter';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';

import { ParamModel } from 'src/app/Model/ServiceResposeModel/Setups/ParamModel';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { SetupsService } from 'src/app/shared/services/Setups.service';
import { ParamterEditTemplateComponent } from '../gridEditorTemplates/paramterEditTemplate/ParamterEditTemplateComponent';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-parametersetup',
  templateUrl: './parametersetup.component.html',
  styleUrls: ['./parametersetup.component.scss']
})
export class ParametersetupComponent implements OnInit , AfterViewInit {
  parameterFilter: ParameterFilter;
  stacksArray: ReferenceRecords[] = [];
  paramListDataSource: MatTableDataSource<ParamModel>;
  displayedColumns: string[] = [
    'editAction', 'StackName', 'paramname', 'paramunit',
    'paramminval', 'parammaxval', 'threshholdval',
    'paramposition', 'creatts', 'updtts',
   'deleteAction'];

   receivedChildMessage: string;

   @ViewChild(MatSort, { static: false }) sort: MatSort;
   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
   constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _setupsservices: SetupsService,
    private snackBar: MatSnackBar) {
    _appcomponent.currenturl = '/Paramsetup';
    this.paramListDataSource = new MatTableDataSource<ParamModel>();
    this.parameterFilter = new ParameterFilter();
  }

  ngOnInit() {

    this. getAllStacks();
    this.getAllParameterList();
    this.parameterFilter.StackId = 0;
    this.parameterFilter.SiteId = this._appcomponent.SiteId;
  }

  ngAfterViewInit(): void {
    this.paramListDataSource.sort = this.sort;
    this.paramListDataSource.paginator = this.paginator;
  }

  StackChange() {
    this.getAllParameterList();
  }

  getAllParameterList(): void {

    this.parameterFilter.SiteId = this._appcomponent.SiteId;
    this._setupsservices.getAllParameterList(this.parameterFilter).subscribe(resp => {
     this.paramListDataSource.data = resp.model as ParamModel[];
   }, error => {
     console.log('Error: ' + error);
   });
 }
getAllStacks(): void {
  this._setupsservices.getAllStacks(0, true).subscribe(resp => {
    this.stacksArray = resp.model as ReferenceRecords[];
  }, error => {
    console.log('Error: ' + error);
  });
}

editParameter(scheduler: ParamModel): void {
  const dialogRef = this._dialog.open(ParamterEditTemplateComponent, {
    width: '500px',
    data: { action: 'edit', scheduler }
  });
  dialogRef.componentInstance.parameterEditorEmitter.subscribe((response: any) => {
    if (response.model > 0) {
      this.showSnackBar('Parameter Updated Successfully.');
      this. getAllParameterList();

    } else {
      this.showSnackBar('Error occurred while updating the Parameter.', true);
    }
  });
}

deleteParameter(paramid: number): void {
  const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
    width: '420px',
    data: { Title: 'Confirm', Message: 'Are you sure want to delete this Parameter ?' }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this._setupsservices.deleteParameter(paramid).subscribe((response: any) => {
        if (response.model) {
          this. getAllParameterList();
          // this.showSnackBar('Scheduled Parameter Deleted Successfully.');
        } else {
        // this.showSnackBar('Error occurred while deleting the Parameter.', true);
        }
        this.showSnackBar(response.message);
      }, error => {
        console.log('Error: ' + error);
      });
    }
  });
}

NewParameter(): void {
  const dialogRef = this._dialog.open(ParamterEditTemplateComponent, {
    width: '500px',
    data: { action: 'add', ParamModel }
  });
  dialogRef.componentInstance.parameterEditorEmitter.subscribe((response: any) => {
    if (response.model > 0) {
      this.getAllParameterList();
      this.showSnackBar(response.message);
    } else {
      this.showSnackBar(response.message, true);
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
