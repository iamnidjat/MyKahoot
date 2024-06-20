import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found-form',
  templateUrl: './not-found-form.component.html',
  styleUrls: ['./not-found-form.component.css']
})
export class NotFoundFormComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
