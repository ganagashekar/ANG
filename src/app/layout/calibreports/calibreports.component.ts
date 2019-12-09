import { Component, OnInit } from '@angular/core';
import { CalibReportModel } from 'src/app/Model/ServiceResposeModel/Setups/CalibReportModel';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { CalibReportService } from 'src/app/shared/services/CalibReport.service';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { CalibReportFilter } from 'src/app/Model/FilterModels/CalibReportFilter';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-calibreports',
  templateUrl: './calibreports.component.html',
  styleUrls: ['./calibreports.component.scss']
})
export class CalibreportsComponent implements OnInit {
  CalibReportFilter: CalibReportFilter;
  CalibListDataSource: MatTableDataSource<CalibReportModel>;
  displayedColumns: string[] = [
     'confgId', 'paramName', 'calibtype', 'calibduriation', 'create_ts', 'updtts', 'deleteAction'
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
