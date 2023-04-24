import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-popup-success-form',
  templateUrl: './popup-success-form.component.html',
  styleUrls: ['./popup-success-form.component.css']
})
export class PopupSuccessFormComponent {
  constructor(private dialogRef : MatDialog) {
  }

  closeDialog(){
    this.dialogRef.closeAll();
  };
}
