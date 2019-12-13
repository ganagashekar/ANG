import { Component, OnInit } from '@angular/core';
import { CalibrationlogModel } from 'src/app/Model/ServiceResposeModel/Setups/CalibLogsModel';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { CalibrationlogsService } from 'src/app/shared/services/Calibrationlogs.service';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { CalibrationlogFilter } from 'src/app/Model/FilterModels/calibrationlogFilter';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-calibrationlogs',
  templateUrl: './calibrationlogs.component.html',
  styleUrls: ['./calibrationlogs.component.scss']
})
export class CalibrationlogsComponent implements OnInit {
  CalibrationlogFilter: CalibrationlogFilter;
  CalibListDataSource: MatTableDataSource<CalibrationlogModel>;
  displayedColumns: string[] = [
    'siteId', 'siteName', 'paramName', 'calibtype', 'calib_zero_gas_unit', 'ca_set_new_zero_value', 'calib_zero_delay',
    'calib_zero_duriation', 'calib_start_date', 'calib_end_date', 'iconAction'
   ];
  constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _calibrationlogsServices: CalibrationlogsService,
    private snackBar: MatSnackBar) {
      _appcomponent.currenturl = '/Calibrationreport';
      this.CalibListDataSource = new MatTableDataSource<CalibrationlogModel>();
      this.CalibrationlogFilter = new CalibrationlogFilter();
     }
     ngOnInit() {
      this.getAllCalibList();
    }

    getAllCalibList(): void {
      this.CalibrationlogFilter.confgId  = this._appcomponent.confgID;
      this._calibrationlogsServices.getAllCalibrationList(this.CalibrationlogFilter).subscribe(resp => {
       this.CalibListDataSource.data = resp.model as CalibrationlogModel[];
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
