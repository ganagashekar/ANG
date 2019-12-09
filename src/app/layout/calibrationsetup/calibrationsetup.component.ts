import { Component, OnInit } from '@angular/core';
import { CalibrationModel } from 'src/app/Model/ServiceResposeModel/Setups/CalibrationSetupModel';
import { DataSource } from '@angular/cdk/table';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { CalibrationService } from 'src/app/shared/services/Calibration.service';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { CalibrationFilter } from 'src/app/Model/FilterModels/CalibrationFilter';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { CalibEditTemplateComponent } from '../gridEditorTemplates/calibEditTemplate/calibEditTemplate.component';



@Component({
  selector: 'app-calibrationsetup',
  templateUrl: './calibrationsetup.component.html',
  styleUrls: ['./calibrationsetup.component.scss']
})
export class CalibrationsetupComponent implements OnInit {
  calibrationFilter: CalibrationFilter;
  CalibrationListDataSource: MatTableDataSource<CalibrationModel>;
  displayedColumns: string[] = [
     'editAction', 'confg_id', 'stack_name', 'param_name', 'updtUsr', 'updtts', 'deleteAction'
   ];
  constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _calibrationservices: CalibrationService,
    private snackBar: MatSnackBar) {
      _appcomponent.currenturl = '/Calibration';
      this.CalibrationListDataSource = new MatTableDataSource<CalibrationModel>();
      this.calibrationFilter = new CalibrationFilter();
     }

  ngOnInit() {
    this.getAllCalibrationList();
  }

  getAllCalibrationList(): void {
    this.calibrationFilter.confg_id = this._appcomponent.confgID;
    this._calibrationservices.getAllCalibrationList(this.calibrationFilter).subscribe(resp => {
     this.CalibrationListDataSource.data = resp.model as CalibrationModel[];
   }, error => {
     console.log('Error: ' + error);
   });
 }
 NewCalibration(): void {
  const dialogRef = this._dialog.open(CalibEditTemplateComponent, {
    width: '500px',
    data: { action: 'add', CalibrationModel }
  });
  dialogRef.componentInstance.CalibEditorEmitter.subscribe((response: any) => {
     if (response.model > 0) {
      this.getAllCalibrationList();
      this.showSnackBar('calibration details added Successfully.');
      } else {
    this.showSnackBar(response.message, true);
    }
  });
 }

 editcalibration(Scheduler: CalibrationModel): void {
  const dialogRef = this._dialog.open(CalibEditTemplateComponent, {
    width: '500px',
    data: { action: 'edit', Scheduler }
  });
  dialogRef.componentInstance.CalibEditorEmitter.subscribe((response: any) => {
  if (response.model > 0) {
     this. getAllCalibrationList();
    this.showSnackBar('Calibration Updated Successfully.');
   } else {
 this.showSnackBar('Error occurred while updating the Calibration.', true);
   }
  });
}

Deletecalibration(calib_cmd_id: number): void {
  const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
    width: '420px',
    data: { Title: 'Confirm', Message: 'Are you sure want to delete this Calibration ?' }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this._calibrationservices.Deletecalibration(calib_cmd_id).subscribe((response: any) => {
        if (response.model) {
           this. getAllCalibrationList();
           this.showSnackBar('Scheduled Calibration Deleted Successfully.');
        } else {
        this.showSnackBar('Error occurred while deleting the Calibration.', true);
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
