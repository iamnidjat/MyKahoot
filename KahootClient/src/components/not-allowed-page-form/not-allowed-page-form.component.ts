import { Component } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-not-allowed-page-form',
  templateUrl: './not-allowed-page-form.component.html',
  styleUrls: ['./not-allowed-page-form.component.css']
})
export class NotAllowedPageFormComponent {
  constructor(private location: Location) {}

  public goBack(): void {
    this.location.back();
  }
}
