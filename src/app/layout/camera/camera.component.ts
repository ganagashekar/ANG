import { Component, OnInit } from '@angular/core';
import { CameraModel } from 'src/app/Model/ServiceResposeModel/Setups/CameraModel';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { CameraService } from 'src/app/shared/services/Camera.service';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CameraFilter } from 'src/app/Model/FilterModels/CameraFilter';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { CameraEditTemplateComponent } from '../gridEditorTemplates/cameraEditTemplate/cameraEditTemplate.component';
import { LiveCameraTemplateComponent } from '../gridEditorTemplates/LiveCameraTemplate/LiveCameraTemplate.component';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {
  cameraFilter: CameraFilter;
  CameraListDataSource: MatTableDataSource<CameraModel>;
  displayedColumns: string[] = [
     'editAction', 'cameraAction', 'confgId', 'siteId',  'paramName', 'rtpsUrl', 'creat_usr', 'creat_ts', 'updt_ts', 'deleteAction'
   ];
  constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,  private router: Router,
    private _cameraservices: CameraService,
    private snackBar: MatSnackBar) {
      _appcomponent.currenturl = '/Camera';
      this.CameraListDataSource = new MatTableDataSource<CameraModel>();
      this.cameraFilter = new CameraFilter();
    }

  ngOnInit() {
    this.getAllCameraList();
  }
  getAllCameraList(): void {
    this.cameraFilter.confgId = this._appcomponent.confgID;
    this._cameraservices.getAllCameraList(this.cameraFilter).subscribe(resp => {
     this.CameraListDataSource.data = resp.model as CameraModel[];
   }, error => {
     console.log('Error: ' + error);
   });
 }

 Newcamera(): void {
  const dialogRef = this._dialog.open( CameraEditTemplateComponent, {
    width: '500px',
    data: { action: 'add',  CameraModel }
  });
  dialogRef.componentInstance. CameraEditorEmitter.subscribe((response: any) => {
     if (response.model > 0) {
       this.getAllCameraList();
      this.showSnackBar('Camera added Successfully.');
        } else {
    this.showSnackBar(response.message, true);
     }
  });
 }

 livecamera(model: CameraModel): void {
  const dialogRef = this._dialog.open( LiveCameraTemplateComponent, {
    width: '500px',
    data: { action: 'add',  model }
  });

 }

 editcamera(Scheduler: CameraModel): void {
  const dialogRef = this._dialog.open(CameraEditTemplateComponent, {
    width: '500px',
    data: { action: 'edit', Scheduler }
  });
  dialogRef.componentInstance.CameraEditorEmitter.subscribe((response: any) => {
  if (response.model > 0) {
     this. getAllCameraList();
    this.showSnackBar('Camera Updated Successfully.');
   } else {
 this.showSnackBar('Error occurred while updating the Camera.', true);
   }
  });
}

Deletecamera(camId: number): void {
const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
  width: '420px',
  data: { Title: 'Confirm', Message: 'Are you sure want to delete this Camera ?' }
});
dialogRef.afterClosed().subscribe(result => {
  if (result) {
    this._cameraservices.deletecamera(camId).subscribe((response: any) => {
      if (response.model) {
         this. getAllCameraList();
         this.showSnackBar('Camera Deleted Successfully.');
      } else {
      this.showSnackBar('Error occurred while deleting the Camera.', true);
      }
      this.showSnackBar(response.message);
    }, error => {
      console.log('Error: ' + error);
    });
  }
});
}

btnClick(): void {
  this.router.navigateByUrl('/LiveCamera');
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

