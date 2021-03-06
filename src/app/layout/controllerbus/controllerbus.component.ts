import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { ControllerBusFilter } from '../../Model/FilterModels/ControllerBusFilter';
import { ReferenceRecords } from '../../Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { ControllerBusModel } from '../../Model/ServiceResposeModel/Setups/ControllerBusModel';
import { AppComponent } from '../../../app/app.component';
import { ActivatedRoute } from '@angular/router';
import { ControllerBusService } from '../../shared/services/controllerbus.services';

import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { ControllerbusEditTemplateComponent } from '../gridEditorTemplates/controllerbusEditTemplate/controllerbusEditTemplate.component';

@Component({
  selector: 'app-controllerbus',
  templateUrl: './controllerbus.component.html',
  styleUrls: ['./controllerbus.component.scss']
})
export class ControllerBusComponent implements OnInit {
  ControllerBusFilter: ControllerBusFilter;
  ControllerBusListDataSource: MatTableDataSource<ControllerBusModel>;
  sitesArray: ReferenceRecords[] = [];
  macArray: any = [];
  displayedColumns: string[] = [
    'editAction', 'macId', 'protocal', 'comPort', 'baudrate', 'timeOut', 'startIndex', 'updtts', 'deleteAction'
   ];

  constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _controllerBusservices: ControllerBusService,
    private snackBar: MatSnackBar) {
      _appcomponent.currenturl = '/ControllerBusSetup';
      this.ControllerBusListDataSource = new MatTableDataSource<ControllerBusModel>();
      this.ControllerBusFilter = new ControllerBusFilter();
    }



  ngOnInit() {
    this.getSites();
    this.getmacs();
    this.getAllControllerBusinfoList ();
  }


  SiteChange() {
    this.getAllControllerBusinfoList();
  }

  macsChange() {
    this.getAllControllerBusinfoList();
  }
  getAllControllerBusinfoList(): void {

    this._controllerBusservices.getAllControllerBusinfoList(this.ControllerBusFilter).subscribe(resp => {
     this.ControllerBusListDataSource.data = resp.model as ControllerBusModel[];
   }, error => {
     console.log('Error: ' + error);
   });
  }

  getSites(): void {
    this._controllerBusservices.getAllSites(0, false).subscribe(resp => {
      this.sitesArray = resp.model as ReferenceRecords[];
    }, error => {
      console.log('Error: ' + error);
    });
  }

 getmacs(): void {
  this._controllerBusservices.getAllControllerbus('', false ).subscribe(resp => {
    this.macArray = resp.model as ReferenceRecords[];
  }, error => {
    console.log('Error: ' + error);
  });
}

  NewControllerBus(): void {
    const dialogRef = this._dialog.open(ControllerbusEditTemplateComponent, {
      width: '500px',
      data: { action: 'add', ControllerBusModel }
    });
    dialogRef.componentInstance.CntrBusEditorEmitter.subscribe((response: any) => {
       if (response.model > 0) {
         this.getAllControllerBusinfoList();
        this.showSnackBar('ControllerBus details added Successfully.');
         } else {
        this.showSnackBar(response.message, true);
       }
    });
   }
   deletecontrollerbus(busId: bigint): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '420px',
      data: { Title: 'Confirm', Message: 'Are you sure want to delete this controllerBus ?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._controllerBusservices.deletecontrollerbus(busId).subscribe((response: any) => {
         if (response.model) {
             this. getAllControllerBusinfoList();
             this.showSnackBar('Scheduled Controllerbus Deleted Successfully.');
         } else {
           this.showSnackBar('Error occurred while deleting the Controllerbus.', true);
          }

        }, error => {
          console.log('Error: ' + error);
        });
      }
    });
  }

   editcontrollerbus(Scheduler: ControllerBusModel): void {
    const dialogRef = this._dialog.open(ControllerbusEditTemplateComponent, {
      width: '500px',
      data: { action: 'edit', Scheduler }
    });
    dialogRef.componentInstance.CntrBusEditorEmitter.subscribe((response: any) => {
    if (response.model > 0) {
      this.showSnackBar('Controllerbus Updated Successfully.');
      this. getAllControllerBusinfoList();
     } else {
   this.showSnackBar('Error occurred while updating the Controllerbus.', true);
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
