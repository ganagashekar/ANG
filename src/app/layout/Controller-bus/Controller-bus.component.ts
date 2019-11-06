import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { ControllerBusFilter } from 'src/app/Model/FilterModels/ControllerBusFilter';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { ControllerBusModel } from 'src/app/Model/ServiceResposeModel/Setups/ControllerBusModel';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { ControllerBusService } from 'src/app/shared/services/ControllerBus.services';
import { CntrbusEditTemplateComponent } from 'src/app/layout/gridEditorTemplates/CntrbusEditTemplate/CntrbusEditTemplate.Component';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-Controller-bus',
  templateUrl: './Controller-bus.component.html',
  styleUrls: ['./Controller-bus.component.scss']
})
export class ControllerBusComponent implements OnInit {
  ControllerBusFilter: ControllerBusFilter;
  ControllerBusListDataSource: MatTableDataSource<ControllerBusModel>;
  displayedColumns: string[] = [
     'busId', 'macId', 'comPort', 'baudRate', 'timeOut', 'startIndex', 'protocal', 'updtts', 'deleteAction'
   ];

  constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _controllerBusservices: ControllerBusService,
    private snackBar: MatSnackBar) {
      _appcomponent.currenturl = '/ControllerBusSetup';
      this.ControllerBusListDataSource = new MatTableDataSource<ControllerBusModel>();
      this.ControllerBusFilter = new ControllerBusFilter();
    }



  ngOnInit() {
    this.getAllControllerBusinfoList ();
  }

  getAllControllerBusinfoList(): void {
    this.ControllerBusFilter.MacId = this._appcomponent.MacId;
    this.ControllerBusFilter.BusId = this._appcomponent.BusId;
    this._controllerBusservices.getAllControllerBusinfoList(this.ControllerBusFilter).subscribe(resp => {
     this.ControllerBusListDataSource.data = resp.model as ControllerBusModel[];
   }, error => {
     console.log('Error: ' + error);
   });
  }

  NewControllerbus(): void {
    const dialogRef = this._dialog.open(CntrbusEditTemplateComponent, {
      width: '500px',
      data: { action: 'add', ControllerBusModel }
    });
    dialogRef.componentInstance.controllerbusEditorEmitter.subscribe((response: any) => {
      // if (response.model > 0) {
        // this.getAllParameterList();
        this.showSnackBar('Errorcode added Successfully.');    // } else {
      //  this.showSnackBar(response.message, true);
      // };
    });
   }

   DeleteControllerbus(busId: number): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '420px',
      data: { Title: 'Confirm', Message: 'Are you sure want to delete this Controllerbus ?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._controllerBusservices.DeleteControllerbus(busId).subscribe((response: any) => {
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
