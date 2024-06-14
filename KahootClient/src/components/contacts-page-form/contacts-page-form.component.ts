import {Component, ElementRef, ViewChild} from '@angular/core';
import Swal from "sweetalert2";

const API_URL: string = "https://localhost:7176/api/v1/Feedback/";

@Component({
  selector: 'app-contacts-page-form',
  templateUrl: './contacts-page-form.component.html',
  styleUrls: ['./contacts-page-form.component.css']
})
export class ContactsPageFormComponent {
  @ViewChild('FirstName') firstName!: ElementRef;
  @ViewChild('LastName') lastName!: ElementRef;
  @ViewChild('Email') email!: ElementRef;
  @ViewChild('PhoneNumber') phoneNumber!: ElementRef;
  @ViewChild('Message') message!: ElementRef;

  public sendMessage(e: any, firstName: string, lastName: string, email: string, phoneNumber: string, message: string): any {
    e.preventDefault();

    if (firstName !== "" || lastName !== "" || email !== "" || phoneNumber !== "" || message !== "") {
      fetch(API_URL + `SendFeedback?firstName=${firstName}&lastName=${lastName}&email=${email}&phoneNumber=${phoneNumber}&message=${message}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      }).then((response) => {
        if (response.status == 200) {
          Swal.fire("Your feedback was sent!");
          this.clearContactUsInputs();
        }
        else {
          Swal.fire('Oops', 'Something got wrong!', 'error');
          this.clearContactUsInputs();
        }
      });
    }
    else {
      Swal.fire('Oops', 'All fields are required!', 'error');
      this.clearContactUsInputs();
    }
  }

  private clearContactUsInputs(): void{
    this.firstName.nativeElement.value = '';
    this.lastName.nativeElement.value = '';
    this.email.nativeElement.value = '';
    this.phoneNumber.nativeElement.value = '';
    this.message.nativeElement.value = '';
  }
}
