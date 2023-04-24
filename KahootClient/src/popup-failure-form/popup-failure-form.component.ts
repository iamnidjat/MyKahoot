import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-popup-failure-form',
  templateUrl: './popup-failure-form.component.html',
  styleUrls: ['./popup-failure-form.component.css']
})
export class PopupFailureFormComponent {
  constructor(private dialogRef : MatDialog) {
  }

  closeDialog(){
    this.dialogRef.closeAll();
  };
}
