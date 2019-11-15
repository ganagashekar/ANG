import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { SitesetupService } from 'src/app/shared/services/Sitesetup.service';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { SiteSetupModel } from 'src/app/Model/ServiceResposeModel/Setups/SiteSetupModel';
import { SiteSetupFilter } from 'src/app/Model/FilterModels/SiteSetupFilter';

@Component({
  selector: 'app-SiteEditTemplate',
  templateUrl: './SiteEditTemplate.component.html',
  styleUrls: ['./SiteEditTemplate.component.scss']
})
export class SiteEditTemplateComponent implements OnInit {
  @Output()
  siteEditorEmitter = new EventEmitter<any>();
  schedulerForm: FormGroup;
  // stacksArray: ReferenceRecords[] = [];
  // paramArray: ReferenceRecords[] = [];
  // paramUnitsArray: ReferenceRecords[] = [];
  isAdd = true;
 SelectedsiteId: bigint;
 // SelecteduserName: string;
 // SelectedvendorsiteId: bigint;
  editModel: SiteSetupModel;
   siteSetupFilter: SiteSetupFilter ;
  constructor(public dialogRef: MatDialogRef<SiteEditTemplateComponent>, private _Sitesetupservices: SitesetupService,
    @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
     private snackBar: MatSnackBar) {
       this.siteSetupFilter = new SiteSetupFilter();
       if (data !== undefined && data.action === 'edit') {
         this.isAdd = false;
         this.editModel = (data.Scheduler as  SiteSetupModel);
        this.SelectedsiteId = this.editModel.siteId;
      //  // this.SelecteduserName = this.editModel.userName;
      //  // this.SelectedvendorisEnabled = this.editModel.isEnabled;
      // }
    }
  }
  ngOnInit() {
    this.schedulerForm = this.formBuilder.group({
      siteId: new FormControl('', [Validators.required]),
      siteName: new FormControl('', [Validators.required]),
      site_cpcb_cd: new FormControl('', [Validators.required]),
      site_city: new FormControl('', [Validators.required]),
      site_state: new FormControl('', [Validators.required]),
      site_country: new FormControl('', [Validators.required]),

  });
  if (this.isAdd) { // scheduler add
    const currentTime = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
    this.schedulerForm.patchValue({
    });
  } else {


      this.schedulerForm.patchValue({
        siteId: this.editModel.siteId,
        siteName: this.editModel.siteName,
        site_cpcb_cd: this.editModel.site_cpcb_cd,
        site_city: this.editModel.site_city,
        site_state: this.editModel.site_state,
        site_country: this.editModel.site_country,

      });


    }

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
     schedulerDetails.siteId = this.SelectedsiteId;
   }
   this._Sitesetupservices.savesite(schedulerDetails).subscribe(resp => {
     this.onCloseClick();
     this.siteEditorEmitter.emit(resp);
   }, error => {
     console.log('Error: ' + error);
     this.schedulerForm.enable();
   });
 }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
