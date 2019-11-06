import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { ControllerFilter } from 'src/app/Model/FilterModels/ControllerFilter';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { ControllerModel } from 'src/app/Model/ServiceResposeModel/Setups/ControllerModel';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { ControllerService } from 'src/app/shared/services/Controller.service';
import { CntrEditTemplateComponent } from 'src/app/layout/gridEditorTemplates/CntrEditTemplate/CntrEditTemplate.Component';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-Controller',
  templateUrl: './Controller.component.html',
  styleUrls: ['./Controller.component.scss']
})
export class ControllerComponent implements OnInit {
  ControllerFilter: ControllerFilter;
  ControllerListDataSource: MatTableDataSource<ControllerModel>;
  displayedColumns: string[] = [
     'MacId', 'SiteId', 'OsType', 'cpcb_url', 'spcb_url', 'licence_key', 'updtts', 'deleteAction'
   ];
  constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _controllerservices: ControllerService,
    private snackBar: MatSnackBar) {
      _appcomponent.currenturl = '/Controllersetup';
      this.ControllerListDataSource = new MatTableDataSource<ControllerModel>();
      this.ControllerFilter = new ControllerFilter();
    }

  ngOnInit() {
    this.getAllControllerinfoList ();
  }
  getAllControllerinfoList(): void {
    this.ControllerFilter.MacId = this._appcomponent.MacId;
    this.ControllerFilter.SiteId = this._appcomponent.SiteId;
    this._controllerservices.getAllControllerinfoList(this.ControllerFilter).subscribe(resp => {
     this.ControllerListDataSource.data = resp.model as ControllerModel[];
   }, error => {
     console.log('Error: ' + error);
   });

 }

 deleteController(macId: string, SiteId: number): void {
  const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
    width: '420px',
    data: { Title: 'Confirm', Message: 'Are you sure want to delete this Parameter ?' }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this._controllerservices.deleteController(macId).subscribe((response: any) => {
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

NewController(): void {
  alert('hi');
  const dialogRef = this._dialog.open(CntrEditTemplateComponent, {
    width: '500px',
    data: { action: 'add', ControllerModel }
  });
  dialogRef.componentInstance.ControllerEditorEmitter.subscribe((response: any) => {
    // if (response.model > 0) {
      // this.getAllParameterList();
      this.showSnackBar('ErrorCode Updated Successfully.');
     // this.showSnackBar(response.message);
    // } else {
// this.showSnackBar(response.message, true);
    // }
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
