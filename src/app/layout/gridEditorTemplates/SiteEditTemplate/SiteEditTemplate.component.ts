import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule , FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { SitesetupService } from 'src/app/shared/services/Sitesetup.service';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { SiteSetupModel } from 'src/app/Model/ServiceResposeModel/Setups/SiteSetupModel';
import { SiteSetupFilter } from 'src/app/Model/FilterModels/SiteSetupFilter';

@Component({
  selector: 'app-siteedittemplate',
  templateUrl: './siteEditTemplate.component.html',
  styleUrls: ['./siteEditTemplate.component.scss']
})
export class SiteEditTemplateComponent implements OnInit {
  @Output()
  siteEditorEmitter = new EventEmitter<any>();
  schedulerForm: FormGroup;
  // stacksArray: ReferenceRecords[] = [];
  // paramArray: ReferenceRecords[] = [];
  siteStatesArray: ReferenceRecords[] = [];
  siteDistrictsArray: ReferenceRecords[] = [];
  siteCitiesArray: ReferenceRecords[] = [];
  siteindusriestsArray: ReferenceRecords[] = [];
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
    this.getAllsitestateList(0);
    this.getAllsitedistrictList(0);
    this.getAllsitecityList(0);
    this.getAllsiteindustryist(0);
    this.schedulerForm = this.formBuilder.group({
      siteId: new FormControl('', [Validators.required]),
      siteName: new FormControl('', [Validators.required]),
      site_cpcb_cd: new FormControl('', [Validators.required]),
      site_in_ganga_basin: new FormControl('', [Validators.required]),
      site_city: new FormControl('', [Validators.required]),
      site_state: new FormControl('', [Validators.required]),
      site_country: new FormControl('', [Validators.required]),
      siteLogo: new FormControl('', [Validators.required]),
      industryType: new FormControl('', [Validators.required]),
      sitePrimaryContactName: new FormControl('', [Validators.required]),
      sitePrimaryContactPhone: new FormControl('', [Validators.required]),
      sitePrimaryContactEmail: new FormControl('', [Validators.required]),
      siteSecondaryContactName: new FormControl('', [Validators.required]),
      siteSecondaryContactPhone: new FormControl('', [Validators.required]),
      siteSecondaryContactEmail: new FormControl('', [Validators.required]),
      siteLatitude: new FormControl('', [Validators.required]),
      siteLongitude: new FormControl('', [Validators.required]),
      siteAddress1: new FormControl('', [Validators.required]),
      siteAddress2: new FormControl('', [Validators.required]),
      sitePinCode: new FormControl('', [Validators.required]),
      site_District: new FormControl('', [Validators.required]),

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
        site_in_ganga_basin: this.editModel.site_in_ganga_basin,
        site_city: this.editModel.site_city,
        site_state: this.editModel.site_state,
        site_country: this.editModel.site_country,
        siteLogo: this.editModel.siteLogo,
        industryType: this.editModel.industryType,
        sitePrimaryContactName: this.editModel.sitePrimaryContactName,
        sitePrimaryContactPhone: this.editModel.sitePrimaryContactPhone,
        sitePrimaryContactEmail: this.editModel.sitePrimaryContactEmail,
        siteSecondaryContactName: this.editModel.siteSecondaryContactName,
        siteSecondaryContactPhone: this.editModel.siteSecondaryContactPhone,
        siteSecondaryContactEmail: this.editModel.siteSecondaryContactEmail,
        siteLatitude: this.editModel.siteLatitude,
        siteLongitude: this.editModel.siteLongitude,
        siteAddress1: this.editModel.siteAddress1,
        siteAddress2: this.editModel.siteAddress2,
        sitePinCode: this.editModel.sitePinCode,
        site_District: this.editModel.site_District,


      });


    }

}
getAllsiteindustryist(siteId: number): void {

   this.siteSetupFilter.SiteId = 1;
  // this.siteSetupFilter.StackId = siteId;
  this._Sitesetupservices.getReferencerecords(10, false).subscribe(resp => {
    this.siteindusriestsArray = resp.model as ReferenceRecords[];
 }, error => {
   console.log('Error: ' + error);
 });
}

getAllsitecityList(siteId: number): void {

  // this.siteSetupFilter.SiteId = 1;
  // this.siteSetupFilter.StackId = siteId;
  this._Sitesetupservices.getReferencerecords(13, false).subscribe(resp => {
    this.siteCitiesArray = resp.model as ReferenceRecords[];
 }, error => {
   console.log('Error: ' + error);
 });
}

getAllsitestateList(siteId: number): void {

  // this.siteSetupFilter.SiteId = 1;
  // this.siteSetupFilter.StackId = siteId;
  this._Sitesetupservices.getReferencerecords(11, false).subscribe(resp => {
    this.siteStatesArray = resp.model as ReferenceRecords[];
 }, error => {
   console.log('Error: ' + error);
 });
}

getAllsitedistrictList(siteId: number): void {

  // this.siteSetupFilter.SiteId = 1;
  // this.siteSetupFilter.StackId = siteId;
  this._Sitesetupservices.getReferencerecords(12, false).subscribe(resp => {
    this.siteDistrictsArray = resp.model as ReferenceRecords[];
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
