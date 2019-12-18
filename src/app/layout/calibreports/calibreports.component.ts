import { Component, OnInit } from '@angular/core';
import { CalibReportModel } from 'src/app/Model/ServiceResposeModel/Setups/CalibReportModel';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { CalibReportService } from 'src/app/shared/services/CalibReport.service';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { CalibReportFilter } from 'src/app/Model/FilterModels/CalibReportFilter';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { CalibreportEditTemplateComponent } from '../gridEditorTemplates/calibreportEditTemplate/calibreportEditTemplate.component';
@Component({
  selector: 'app-calibreports',
  templateUrl: './calibreports.component.html',
  styleUrls: ['./calibreports.component.scss']
})
export class CalibreportsComponent implements OnInit {
  CalibReportFilter: CalibReportFilter;
  CalibListDataSource: MatTableDataSource<CalibReportModel>;
  displayedColumns: string[] = [
     'editAction', 'siteId', 'siteName', 'stack_name', 'paramname', 'calibtype', 'calib_zero_gas_name',
      'calib_zero_gas_unit',
     'ca_set_new_zero_value', 'calib_zero_duriation', 'calib_zero_delay',
     'calib_span_gas_name', 'calib_span_gas_unit',  'ca_set_new_span_value',
     'calib_span_duriation', 'calib_span_delay',  'calib_start_date',
       'deleteAction'
   ];
  constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _calibrationservices: CalibReportService,
    private snackBar: MatSnackBar) {
      _appcomponent.currenturl = '/Calibrationreport';
      this.CalibListDataSource = new MatTableDataSource<CalibReportModel>();
      this.CalibReportFilter = new CalibReportFilter();
     }


     ngOnInit() {
      this.getAllCalibList();
    }

    getAllCalibList(): void {
      this.CalibReportFilter.confgId  = this._appcomponent.confgID;
      this._calibrationservices.getAllCalibrationList(this.CalibReportFilter).subscribe(resp => {
       this.CalibListDataSource.data = resp.model as CalibReportModel[];
     }, error => {
       console.log('Error: ' + error);
     });
   }


   Newcalibreport(): void {
    const dialogRef = this._dialog.open( CalibreportEditTemplateComponent, {
      width: '500px',
      data: { action: 'add',  CalibReportModel }
    });
    dialogRef.componentInstance. calibreportEditorEmitter.subscribe((response: any) => {
       if (response.model > 0) {
         this.getAllCalibList();
        this.showSnackBar('Calibreport added Successfully.');
          } else {
      this.showSnackBar(response.message, true);
       }
    });
   }

   editcalibreport(Scheduler: CalibReportModel): void {
    const dialogRef = this._dialog.open(CalibreportEditTemplateComponent, {
      width: '500px',
      data: { action: 'edit', Scheduler }
    });
    dialogRef.componentInstance.calibreportEditorEmitter.subscribe((response: any) => {
    if (response.model > 0) {
       this. getAllCalibList();
      this.showSnackBar('Calibreport Updated Successfully.');
     } else {
   this.showSnackBar('Error occurred while updating the Calibreport.', true);
     }
    });
  }

Deletecalibreport(calibsetupid: number): void {
  const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
    width: '420px',
    data: { Title: 'Confirm', Message: 'Are you sure want to delete this Calibration ?' }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this._calibrationservices.Deletecalibreport(calibsetupid).subscribe((response: any) => {
        if (response.model) {
           this. getAllCalibList();
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
