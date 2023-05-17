import {Component, ElementRef, Injectable, ViewChild} from '@angular/core';
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
  @ViewChild('oldPassword') nameKeyPassword!: ElementRef;
  @ViewChild('newPassword') nameKeyNewPassword!: ElementRef;
  @ViewChild('cNewPassword') nameKeyCNewPassword!: ElementRef;

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
          this.ClearChangePasswordInputs();
        }
      });
    }
    else
    {
      Swal.fire('Oops', 'Incorrect data!', 'error');
      this.ClearChangePasswordInputs();
    }
  }

  private ClearChangePasswordInputs(): any
  {
    this.nameKeyNewPassword.nativeElement.value = '';
    this.nameKeyCNewPassword.nativeElement.value = '';
    this.nameKeyPassword.nativeElement.value = '';
  }
}
