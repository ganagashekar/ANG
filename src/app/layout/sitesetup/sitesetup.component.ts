import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { SiteSetupFilter } from 'src/app/Model/FilterModels/SiteSetupFilter';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { SiteSetupModel } from 'src/app/Model/ServiceResposeModel/Setups/SiteSetupModel';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { SitesetupService } from 'src/app/shared/services/Sitesetup.service';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { SiteEditTemplateComponent } from '../gridEditorTemplates/siteEditTemplate/siteEditTemplate.component';

@Component({
  selector: 'app-sitesetup',
  templateUrl: './sitesetup.component.html',
  styleUrls: ['./sitesetup.component.scss']
})
export class SitesetupComponent implements OnInit {
  siteSetupFilter: SiteSetupFilter;
  sitesetupListDataSource: MatTableDataSource<SiteSetupModel>;
  displayedColumns: string[] = [
     'editAction', 'siteId', 'siteName', 'site_cpcb_cd', 'site_city', 'site_state', 'site_country',
      'create_ts', 'updt_ts', 'deleteAction'
   ];
   @ViewChild(MatSort, { static: false }) sort: MatSort;
   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _Sitesetupservices: SitesetupService,
    private snackBar: MatSnackBar) {
    _appcomponent.currenturl = '/sitesetup';
    this.sitesetupListDataSource = new MatTableDataSource<SiteSetupModel>();
    this.siteSetupFilter = new SiteSetupFilter();
  }

  ngOnInit() {
    this.getAllSitesetupList();
  }
  ngAfterViewInit(): void {
    this.sitesetupListDataSource.sort = this.sort;
    this.sitesetupListDataSource.paginator = this.paginator;
  }
  getAllSitesetupList(): void {
    this.siteSetupFilter.SiteId = this._appcomponent.SiteId;
    this._Sitesetupservices.getAllSitesetupList(this.siteSetupFilter).subscribe(resp => {
     this.sitesetupListDataSource.data = resp.model as SiteSetupModel[];
   }, error => {
     console.log('Error: ' + error);
   });
  }

  newsite(): void {
    const dialogRef = this._dialog.open(SiteEditTemplateComponent, {
      width: '500px',
      data: { action: 'add', SiteSetupModel }
    });
    dialogRef.componentInstance.siteEditorEmitter.subscribe((response: any) => {
       if (response.model > 0) {
        this.getAllSitesetupList();
        // this.showSnackBar(response.message);
         this.showSnackBar('Site details added Successfully.');
          } else {
        this.showSnackBar(response.message, true);
       }
    });
   }

   editsite(Scheduler: SiteSetupModel): void {
    const dialogRef = this._dialog.open(SiteEditTemplateComponent, {
      width: '500px',
      data: { action: 'edit', Scheduler }
    });
    dialogRef.componentInstance.siteEditorEmitter.subscribe((response: any) => {
    if (response.model > 0) {
       this. getAllSitesetupList();
      this.showSnackBar('Site Updated Successfully.');
     } else {
      this.showSnackBar('Error occurred while updating the Site.', true);
     }
    });
  }

  DeleteSite(siteId: bigint): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '420px',
      data: { Title: 'Confirm', Message: 'Are you sure want to delete this Site ?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._Sitesetupservices.DeleteSite(siteId).subscribe((response: any) => {
          if (response.model) {
             this. getAllSitesetupList();
             this.showSnackBar('Scheduled Site Deleted Successfully.');
          } else {
           this.showSnackBar('Error occurred while deleting the Site.', true);
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

