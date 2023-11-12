import {Component, ElementRef, EventEmitter, Injectable, OnInit, Output, ViewChild} from '@angular/core';
import {CreatingQuizOptionFormComponent} from "../creating-quiz-option-form/creating-quiz-option-form.component";
import {NavbarFormComponent} from "../navbar-form/navbar-form.component";
import {HttpClient, HttpErrorResponse, HttpEventType} from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-photo-popup-form',
  templateUrl: './add-photo-popup-form.component.html',
  styleUrls: ['./add-photo-popup-form.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class AddPhotoPopupFormComponent implements OnInit{
  public message: string = "";
  public progress!: number;
  private url: string = "https://localhost:7176/api/v1/Photos/";

  constructor(private http: HttpClient, private el: ElementRef, private variable: NavbarFormComponent) {}

  ClosePopUp(): void{
    let modal = this.el.nativeElement.querySelector(".modal");

    modal.style.display = "none";

    this.variable.flag = false;
  }

  UploadFile(files: any): void{
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(this.url + `Upload?userId=${localStorage.getItem("userId")}`, formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / event.total!);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload was successful!';
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });

    fetch(this.url + `GetPhotoURL?userId=${localStorage.getItem("userId")}`, {
      method: "GET"
    }).then((response) => {
          return response.text();
    }).then((data) => {
      localStorage.setItem("photoURL", data);
    });
  }

  ngOnInit(): void {

  }
}
