import { Component, OnInit } from '@angular/core';
import { CalibrationlogModel } from './../..//Model/ServiceResposeModel/Setups/CalibLogsModel';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { CalibrationlogsService } from './../../shared/services/calibrationlogs.service';
import { AppComponent } from './../../app.component';
import { ActivatedRoute } from '@angular/router';
import { CalibrationlogFilter } from './../../Model/FilterModels/calibrationlogFilter';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { ReferenceRecords } from './../../Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { CalibLogsEditTemplateComponent } from '../gridEditorTemplates/calibLogsEditTemplate/calibLogsEditTemplate.component';



@Component({
  selector: 'app-calibrationlogs',
  templateUrl: './calibrationlogs.component.html',
  styleUrls: ['./calibrationlogs.component.scss']
})
export class CalibrationlogsComponent implements OnInit {
  CalibrationlogFilter: CalibrationlogFilter;
  CalibListDataSource: MatTableDataSource<CalibrationlogModel>;
  displayedColumns: string[] = [
    'siteId', 'siteName', 'paramname', 'calibtype', 'calib_zero_gas_unit', 'ca_set_new_zero_value', 'calib_zero_delay',
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

    newCalibLogs(): void {
      //this.SelectedrowDrawCharts();
      const dialogRef = this._dialog.open( CalibLogsEditTemplateComponent, {
        width: '500px',
        data: { action: 'add',  CalibrationlogModel }
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
