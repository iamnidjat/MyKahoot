import {Component, ElementRef, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css']
})

export class ForgotPasswordFormComponent {
  private url: string = "https://localhost:7176/api/v1/Account/";
  private url2: string = "https://localhost:7176/api/v1/UserInfo/";

  @ViewChild('Email') nameKeyMail!: ElementRef;
  constructor(private el: ElementRef, private router: Router) {
  }

  // private CheckStatus(email: string): boolean{ // !
  //   fetch(this.url2 + `IsEmailConfirmed?id=${email}`, {
  //     method: "GET",
  //   }).then((response) => {
  //     return response.json();
  //   }).then((data) => {
  //     localStorage.setItem("IsMailConfirmed", JSON.parse(JSON.stringify(data)));
  //   });
  //
  //   return JSON.parse(localStorage.getItem("IsMailConfirmed")!);
  // }

  public async ResetPassword(e: any, email: string): Promise<void>{
    e.preventDefault();

    if (email !== "")
    {
      await fetch(this.url + `ResetPassword?email=${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      }).then((response) => {
        if (response.status == 200) {
          Swal.fire("Instructions were sent to your mail address!");
          this.router.navigate(['/app/auth-form']);
        }
        else
        {
          Swal.fire('Oops', 'Incorrect data or you did not confirm your account!', 'error');
          this.nameKeyMail.nativeElement.value = '';
        }
      });
    }
    else
    {
      Swal.fire('Oops', 'Incorrect data or you did not confirm your account!', 'error');
      this.nameKeyMail.nativeElement.value = '';
    }
  }
}
