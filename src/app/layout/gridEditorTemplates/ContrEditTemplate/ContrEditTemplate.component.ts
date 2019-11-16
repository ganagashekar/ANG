import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ControllerService } from 'src/app/shared/services/controller.service';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { ControllerModel } from 'src/app/Model/ServiceResposeModel/Setups/ControllerModel';
import { ControllerFilter } from 'src/app/Model/FilterModels/ControllerFilter';


@Component({
  selector: 'app-ContrEditTemplate',
  templateUrl: './ContrEditTemplate.component.html',
  styleUrls: ['./ContrEditTemplate.component.scss']
})
export class ContrEditTemplateComponent implements OnInit {
  @Output()
  ControllerEditorEmitter = new EventEmitter<any>();
  schedulerForm: FormGroup;
  sitesArray: ReferenceRecords[] = [];
  // paramArray: ReferenceRecords[] = [];
  // paramUnitsArray: ReferenceRecords[] = [];
  isAdd = true;
  selectedmacId: string;
  selectedsiteId: bigint;

 // SelecteduserName: string;
 // SelectedvendorsiteId: bigint;
  editModel: ControllerModel;
  ControllerFilter: ControllerFilter ;
  constructor(public dialogRef: MatDialogRef<ContrEditTemplateComponent>, private _controllerservices: ControllerService,
    @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
     private snackBar: MatSnackBar) {
      this.ControllerFilter = new ControllerFilter();
      if (data !== undefined && data.action === 'edit') {
        this.isAdd = false;
        this.editModel = (data.Scheduler as  ControllerModel);
       this.selectedmacId = this.editModel.macId;
       // this.SelecteduserName = this.editModel.userName;
       this.selectedsiteId = this.editModel.siteId;
       // this.SelectedvendorisEnabled = this.editModel.isEnabled;
      }
    }


  ngOnInit() {
    this.getSites(0);
    this.schedulerForm = this.formBuilder.group({
      macId: new FormControl('', [Validators.required]),
      siteId: new FormControl('', [Validators.required]),
      osType: new FormControl('', [Validators.required]),
      cpcbUrl: new FormControl('', [Validators.required]),
      spcburl: new FormControl('', [Validators.required]),
      licenseKey: new FormControl('', [Validators.required]),


  });
  if (this.isAdd) { // scheduler add
    const currentTime = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
    this.schedulerForm.patchValue({
    });
  } else {


      this.schedulerForm.patchValue({
        macId: this.editModel.macId,
        siteId: this.editModel.siteId,
        osType: this.editModel.osType,
        cpcbUrl: this.editModel.cpcbUrl,
        spcburl: this.editModel.spcburl,
        licenseKey: this.editModel.licenseKey,


      });


    }


}
getSites(SiteId: number): void {
  this.ControllerFilter.SiteId = 1;
    this.ControllerFilter.SiteId = SiteId;
  this._controllerservices.getAllSites(0, false).subscribe(resp => {
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
    this.SaveScheduler();

  }
}
SaveScheduler(): void {
  const schedulerDetails = this.schedulerForm.value;
 if (!this.isAdd) {
   schedulerDetails.userId = this.selectedmacId;
 }
 this._controllerservices.savecontroller(schedulerDetails).subscribe(resp => {
   this.onCloseClick();
   this.ControllerEditorEmitter.emit(resp);
 }, error => {
   console.log('Error: ' + error);
   this.schedulerForm.enable();
 });
}

onCloseClick(): void {
  this.dialogRef.close();
}
}
