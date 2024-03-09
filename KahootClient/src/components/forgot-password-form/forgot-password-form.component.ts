import {Component, ElementRef, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {Router} from "@angular/router";

const API_URL: string = "https://localhost:7176/api/v1/Account/";

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css']
})
export class ForgotPasswordFormComponent {
  public myMail: string = "";
  constructor(private el: ElementRef, private router: Router) {}

  public async resetPassword(e: any, email: string): Promise<void>{
    e.preventDefault();

    await fetch(API_URL + `ResetPassword?email=${email}`, {
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
        Swal.fire('Oops', 'Incorrect data!', 'error');
        this.myMail = '';
      }
    });
  }
}
