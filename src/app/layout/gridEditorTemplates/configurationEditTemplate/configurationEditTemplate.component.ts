import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConfgFilter } from 'src/app/Model/FilterModels/ConfgFilter';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfgService } from 'src/app/shared/services/Confg.service';
import { ConfgModel } from 'src/app/Model/ServiceResposeModel/CommonModel/confgModel';

@Component({
  selector: 'app-configurationEditTemplate',
  templateUrl: './configurationEditTemplate.component.html',
  styleUrls: ['./configurationEditTemplate.component.scss']
})
export class ConfigurationEditTemplateComponent implements OnInit {
  @Output()
  ConfigEditorEmitter = new EventEmitter<any>();
  schedulerForm: FormGroup;
  sitesArray: ReferenceRecords[] = [];
  // paramArray: ReferenceRecords[] = [];
  // paramUnitsArray: ReferenceRecords[] = [];
  isAdd = true;
  SelectedconfgId: bigint;
  SelectedsiteId: string;
 SelectedbusId: bigint ;

 // SelecteduserName: string;
 // SelectedvendorsiteId: bigint;
  editModel: ConfgModel;
  ConfgFilter: ConfgFilter ;
  constructor(public dialogRef: MatDialogRef<ConfigurationEditTemplateComponent>, private _confgsservices: ConfgService,
    @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
     private snackBar: MatSnackBar) {
       this.ConfgFilter = new ConfgFilter();
      if (data !== undefined && data.action === 'edit') {
        this.isAdd = false;
        this.editModel = (data.Scheduler as  ConfgModel);
       this.SelectedconfgId = this.editModel.confgID;
       // this.SelecteduserName = this.editModel.userName;
       this.SelectedsiteId = this.editModel.siteID;
       this.SelectedbusId = this.editModel.busID;
       // this.SelectedvendorisEnabled = this.editModel.isEnabled;
      }
    }

  ngOnInit() {
  this.getSites();
    this.schedulerForm = this.formBuilder.group({
      siteID: new FormControl('', [Validators.required]),
     busID: new FormControl('', [Validators.required]),
      stack_name: new FormControl('', [Validators.required]),
      stack_typ: new FormControl('', [Validators.required]),
      stack_status: new FormControl('', [Validators.required]),
      input_format: new FormControl('', [Validators.required]),
      output_format: new FormControl('', [Validators.required]),
      slaveid: new FormControl('', [Validators.required]),
      holdingreg: new FormControl('', [Validators.required]),
      firstreg: new FormControl('', [Validators.required]),
      displayoutputtype: new FormControl('', [Validators.required]),
    });

    if (this.isAdd) { // scheduler add
      const currentTime = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
      this.schedulerForm.patchValue({
      });
    } else {


        this.schedulerForm.patchValue({
          siteID: this.editModel.siteID,
          busID: this.editModel.busID,
          stack_name: this.editModel.stack_name,
          stack_typ: this.editModel.stack_typ,
          stack_status: this.editModel.stack_status,
          input_format: this.editModel.input_format,
          output_format: this.editModel.output_format,
          slaveid: this.editModel.slaveid,
          holdingreg: this.editModel.holdingreg,
          firstreg: this.editModel.firstreg,
          displayoutputtype: this.editModel.displayoutputtype,
        });


      }
  }
  getSites(): void {
    this._confgsservices.getAllSites(0, false).subscribe(resp => {
      this.sitesArray = resp.model as ReferenceRecords[];
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
     schedulerDetails.userId = this.SelectedbusId;
   }
   this._confgsservices.saveConfig(schedulerDetails).subscribe(resp => {
     this.onCloseClick();
     this.ConfigEditorEmitter.emit(resp);
   }, error => {
     console.log('Error: ' + error);
     this.schedulerForm.enable();
   });
 }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  }



