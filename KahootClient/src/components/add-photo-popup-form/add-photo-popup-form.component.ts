import {Component, ElementRef, Injectable} from '@angular/core';
import {NavbarFormComponent} from "../navbar-form/navbar-form.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-photo-popup-form',
  templateUrl: './add-photo-popup-form.component.html',
  styleUrls: ['./add-photo-popup-form.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class AddPhotoPopupFormComponent {
  constructor(private http: HttpClient, private el: ElementRef) {}

  ClosePopUp(): void{
    let modal = this.el.nativeElement.querySelector(".modal");

    modal.style.display = "none";
  }
}
