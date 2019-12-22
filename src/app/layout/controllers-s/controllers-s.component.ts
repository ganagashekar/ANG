import { Component, OnInit } from '@angular/core';
import { ReferenceRecords } from '../../Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { ControllerEditTemplateComponent } from '../gridEditorTemplates/controllerEditTemplate/controllerEditTemplate.component';
import { ControllerModel } from '../../Model/ServiceResposeModel/Setups/ControllerModel';
import { ControllerFilter } from '../../Model/FilterModels/ControllerFilter';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { ControllerService } from '../../shared/services/controller.service';
import { AppComponent } from '../../../app/app.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-controllers-s',
  templateUrl: './controllers-s.component.html',
  styleUrls: ['./controllers-s.component.scss']
})
export class ControllersSComponent implements OnInit {
  ControllerFilter: ControllerFilter;
  ControllerListDataSource: MatTableDataSource<ControllerModel>;
  sitesArray: ReferenceRecords[] = [];
  displayedColumns: string[] = [
     'editAction', 'siteId', 'macId', 'osType', 'cpcbUrl', 'spcburl', 'licenseKey', 'updtts', 'deleteAction'
   ];
  constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _controllerservices: ControllerService,
    private snackBar: MatSnackBar) {
      _appcomponent.currenturl = '/Controllersetup';
      this.ControllerListDataSource = new MatTableDataSource<ControllerModel>();
      this.ControllerFilter = new ControllerFilter();
    }

  ngOnInit() {
    this.getSites();
    this.getAllControllerinfoList ();
  }

  SiteChange() {
    this.getAllControllerinfoList();
  }

  getAllControllerinfoList(): void {

    this._controllerservices.getAllControllerinfoList(this.ControllerFilter).subscribe(resp => {
     this.ControllerListDataSource.data = resp.model as ControllerModel[];
   }, error => {
     console.log('Error: ' + error);
   });

 }

 getSites(): void {
  this._controllerservices.getAllSites(0, false).subscribe(resp => {
    this.sitesArray = resp.model as ReferenceRecords[];
  }, error => {
    console.log('Error: ' + error);
  });
}

 NewController(): void {
  const dialogRef = this._dialog.open(ControllerEditTemplateComponent, {
    width: '500px',
    data: { action: 'add', ControllerModel }
  });
  dialogRef.componentInstance.ControllerEditorEmitter.subscribe((response: any) => {
     if (response.model > 0) {
      this.getAllControllerinfoList();
      this.showSnackBar('Controller details added Successfully.');
          } else {
      this.showSnackBar(response.message, true);
     }
  });
 }

 editcontroller(Scheduler: ControllerModel): void {
  const dialogRef = this._dialog.open(ControllerEditTemplateComponent, {
    width: '500px',
    data: { action: 'edit', Scheduler }
  });
  dialogRef.componentInstance.ControllerEditorEmitter.subscribe((response: any) => {
  if (response.model > 0) {
     this. getAllControllerinfoList();
    this.showSnackBar('Controller Updated Successfully.');
   } else {
 this.showSnackBar('Error occurred while updating the Controller.', true);
   }
  });
}
Deletecontroller(macId: string): void {
  const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
    width: '420px',
    data: { Title: 'Confirm', Message: 'Are you sure want to delete this Controller ?' }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this._controllerservices.Deletecontroller(macId).subscribe((response: any) => {
        if (response.model) {
           this. getAllControllerinfoList();
           this.showSnackBar('Scheduled Controller Deleted Successfully.');
        } else {
        this.showSnackBar('Error occurred while deleting the Controller.', true);
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

