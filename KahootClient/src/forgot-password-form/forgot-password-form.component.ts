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

  @ViewChild('Email') nameKeyMail!: ElementRef;
  constructor(private el: ElementRef, private router: Router) {
  }

  public ResetPassword(e: any, email: string): void{
    e.preventDefault();

    if (email !== "")
    {
      fetch(this.url + `ResetPassword?email=${email}`, {
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
          this.nameKeyMail.nativeElement.value = '';
        }
      });
    }
    else
    {
      Swal.fire('Oops', 'Incorrect data!', 'error');
      this.nameKeyMail.nativeElement.value = '';
    }
  }
}
