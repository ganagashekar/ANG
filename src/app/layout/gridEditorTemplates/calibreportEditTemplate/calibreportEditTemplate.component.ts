import { Component, OnInit , Output, Inject, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CalibReportService } from 'src/app/shared/services/CalibReport.service';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { CalibReportModel } from 'src/app/Model/ServiceResposeModel/Setups/CalibReportModel';
import { CalibReportFilter } from 'src/app/Model/FilterModels/CalibReportFilter';
import { ReportRequestModel } from '../../../Model/Report/ReportRequestModel';
@Component({
  selector: 'app-calibreportEditTemplate',
  templateUrl: './calibreportEditTemplate.component.html',
  styleUrls: ['./calibreportEditTemplate.component.scss']
})
export class CalibreportEditTemplateComponent implements OnInit {
  @Output()
  calibreportEditorEmitter = new EventEmitter<any>();
  schedulerForm: FormGroup;
  calibtypeArray: ReferenceRecords[] = [];
  sitesArray: ReferenceRecords[] = [];
  paramArray: ReferenceRecords[] = [];
  // paramUnitsArray: ReferenceRecords[] = [];
  isAdd = true;
 Selectedconfg_id: bigint ;
 reportRequestModel: ReportRequestModel;
 // SelectedvendorisEnabled: number;
 // SelecteduserName: string;
 // SelectedvendorsiteId: bigint;
  editModel: CalibReportModel;
  calibReportFilter: CalibReportFilter;
  constructor(public dialogRef: MatDialogRef<CalibreportEditTemplateComponent>, private _calibReportServices: CalibReportService,
    @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
     private snackBar: MatSnackBar) {
      this.calibReportFilter = new CalibReportFilter();
       // **As well as this**

  this.reportRequestModel = new ReportRequestModel();
  this.reportRequestModel.SiteId = Number(localStorage.getItem('SiteId'));
  this.reportRequestModel.FromDateVM = (new Date());
  this.reportRequestModel.FromTimeVM = '00:00';
  this.reportRequestModel.ToTimeVM = '23:59';
  this.reportRequestModel.ToDateVM = (new Date());

      if (data !== undefined && data.action === 'edit') {
        this.isAdd = false;
        this.editModel = (data.Scheduler as CalibReportModel );
       this.Selectedconfg_id = this.editModel.confgId;
       // this.SelecteduserName = this.editModel.userName;
       // this.SelectedvendorsiteId = this.editModel.vendorSiteId;
       // this.SelectedvendorisEnabled = this.editModel.isEnabled;
     }
    }
  ngOnInit() {
    this.getSites();
    this.getParam();

    this.getAllcalibtype(0);

    this.schedulerForm = this.formBuilder.group({
      confgId: new FormControl('', [Validators.required]),
      // stack_name: new FormControl('', [Validators.required]),
       paramId: new FormControl('', [Validators.required]),
      clib_name: new FormControl('', [Validators.required]),
      calibtype: new FormControl('', [Validators.required]),
      calib_start_date: new FormControl('', [Validators.required]),
      calib_end_date: new FormControl('', [Validators.required]),
      calib_zero_gas_name: new FormControl('', [Validators.required]),
      calib_zero_gas_unit: new FormControl('', [Validators.required]),
      calib_zero_gas_type: new FormControl('', [Validators.required]),
      ca_set_new_zero_value: new FormControl('', [Validators.required]),
      calib_zero_duriation: new FormControl('', [Validators.required]),
      calib_zero_delay: new FormControl('', [Validators.required]),

      calib_span_gas_name: new FormControl('', [Validators.required]),
      calib_span_gas_unit: new FormControl('', [Validators.required]),
      calib_span_gas_type: new FormControl('', [Validators.required]),
      calib_span_delay: new FormControl('', [Validators.required]),
      calib_span_duriation: new FormControl('', [Validators.required]),
      ca_set_new_span_value: new FormControl('', [Validators.required]),
      siteName: new FormControl('', [Validators.required]),

    });

    if (this.isAdd) { // scheduler add
      const currentTime = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
      this.schedulerForm.patchValue({
      });
    } else {


        this.schedulerForm.patchValue({
          confgId: this.editModel.confgId,
          // stack_name: this.editModel.stack_name,
          paramId: this.editModel.paramId,
          clib_name: this.editModel.clib_name,
          calibtype: this.editModel.calibtype,
         calib_start_date: this.editModel.calib_start_date,
         calib_end_date: this.editModel.calib_end_date,
          calib_zero_gas_name: this.editModel.calib_zero_gas_name,
          calib_zero_gas_unit: this.editModel.calib_zero_gas_unit,
          calib_zero_gas_type: this.editModel.calib_zero_gas_type,
          ca_set_new_zero_value: this.editModel.ca_set_new_zero_value,
          calib_zero_duriation: this.editModel.calib_zero_duriation,
          calib_zero_delay: this.editModel.calib_zero_delay,

          calib_span_gas_name: this.editModel.calib_span_gas_name,
          calib_span_gas_unit: this.editModel.calib_span_gas_unit,
          calib_span_gas_type: this.editModel.calib_span_gas_type,
          calib_span_delay: this.editModel.calib_span_delay,
          calib_span_duriation: this.editModel.calib_span_duriation,
          ca_set_new_span_value: this.editModel.ca_set_new_span_value,
          siteName: this.editModel.siteName,
        });
  }

}
    getSites(): void {
    this._calibReportServices.getAllSites(0, false).subscribe(resp => {
    this.sitesArray = resp.model as ReferenceRecords[];
    }, error => {
     console.log('Error: ' + error);
    });
  }

  getParam(): void {
    this._calibReportServices.getAllParam(0, false).subscribe(resp => {
    this.paramArray = resp.model as ReferenceRecords[];
    }, error => {
     console.log('Error: ' + error);
    });
  }

getAllcalibtype(confgId:  number): void {

  this.calibReportFilter.confgId = 1;
  this.calibReportFilter.confgId = confgId;
  this._calibReportServices.getReferencerecords(14, false).subscribe(resp => {
    this.calibtypeArray = resp.model as ReferenceRecords[];
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

onFormSubmit(): void {
  if (this.schedulerForm.valid) {
    this.schedulerForm.disable();
    this.saveScheduler();

  }
}

saveScheduler(): void {
  const schedulerDetails = this.schedulerForm.value;
 if (!this.isAdd) {
   schedulerDetails.userId = this.Selectedconfg_id;
 }
 this._calibReportServices.saveCalibration(schedulerDetails).subscribe(resp => {
   this.onCloseClick();
   this.calibreportEditorEmitter.emit(resp);
 }, error => {
   console.log('Error: ' + error);
   this.schedulerForm.enable();
 });
}

onCloseClick(): void {
  this.dialogRef.close();
}

}
