import {Component, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.css']
})
export class SettingsFormComponent {
  public flag: boolean = false;
  private url: string = "https://localhost:7176/api/v1/Account/";

  constructor(private router: Router) {
  }

  public changePassword(e: any, oldPassword: string, newPassword: string, cNewPassword: string) {
    e.preventDefault();

    if (newPassword.length >= 5 && newPassword === cNewPassword)
    {
      fetch(this.url + `ChangePassword?login=${localStorage.getItem("Login") || localStorage.getItem("newLogin")}&oldPassword=${oldPassword}&newPassword=${newPassword}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.status == 200)
        {
          Swal.fire('Your password was altered successfully!');
          this.router.navigate(['/app/settings-choice-form']);
        }
        else
        {
          Swal.fire('Oops', 'Incorrect data!', 'error');
        }
      });
    }
    else
    {
      Swal.fire('Oops', 'Incorrect data!', 'error');
    }
  }
}
