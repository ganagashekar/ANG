import { Component, OnInit } from '@angular/core';
import { CalibReportModel } from 'src/app/Model/ServiceResposeModel/Setups/CalibReportModel';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { CalibReportService } from 'src/app/shared/services/CalibReport.service';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { CalibReportFilter } from 'src/app/Model/FilterModels/CalibReportFilter';

@Component({
  selector: 'app-calibreports',
  templateUrl: './calibreports.component.html',
  styleUrls: ['./calibreports.component.scss']
})
export class CalibreportsComponent implements OnInit {
  CalibReportFilter: CalibReportFilter;
  CalibListDataSource: MatTableDataSource<CalibReportModel>;
  displayedColumns: string[] = [
     'confgId', 'paramName', 'calibtype', 'calibduriation', 'create_ts', 'updtts',
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
