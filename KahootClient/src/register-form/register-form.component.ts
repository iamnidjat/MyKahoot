import {Component, ElementRef, ViewChild} from '@angular/core';
import {RegisterModel} from "../RegisterModel";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  public Visibility1: boolean = false;
  public Visibility2: boolean = false;
  @ViewChild('newLogin') nameKey2!: ElementRef;
  @ViewChild('newPassword') nameKeyNewPassword!: ElementRef;
  @ViewChild('cNewPassword') nameKeyCNewPassword!: ElementRef;
  @ViewChild('birthday') nameKeyBirthday!: ElementRef;
  @ViewChild('email') nameKeyMail!: ElementRef;

  private url: string = "https://localhost:7176/api/v1/Account/";

  constructor(private el: ElementRef, private router: Router) {
    // localStorage.removeItem("Login");
    // localStorage.removeItem("newLogin");
    // localStorage.removeItem("Username");
    // localStorage.removeItem("Guest");
    // localStorage.removeItem("userId");
  }

  public Register(e: any, login: string, password: string, cPassword: string, email: string, birthday: string): void{
    e.preventDefault();

    let role = this.Role();

    let registerModel = new RegisterModel(login, password, cPassword, email, new Date(birthday), role);

    if (password === cPassword && password.length >= 5)
    {
      fetch(this.url + "Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerModel)
      }).then((response) => {
        if (response.status == 200)
        {
          localStorage.setItem("newLogin", this.nameKey2.nativeElement.value);
          Swal.fire("You registered successfully!");
          this.router.navigate(['/app/player-options-form']);
        }
        else
        {
          Swal.fire('Oops', 'Incorrect data!', 'error');
          this.ClearRegisterInputs();
        }
        return response.json();
      }).then((data) => {
        let userid = JSON.parse(JSON.stringify(data));
        localStorage.setItem("userId", JSON.stringify(Object.values(userid)[0]));
      });
    }
    else
    {
      Swal.fire('Oops', 'Incorrect data!', 'error');
      this.ClearRegisterInputs();
    }
  }

  private ClearRegisterInputs(): any
  {
    this.nameKey2.nativeElement.value = '';
    this.nameKeyNewPassword.nativeElement.value = '';
    this.nameKeyCNewPassword.nativeElement.value = '';
    this.nameKeyBirthday.nativeElement.value = '';
    this.nameKeyMail.nativeElement.value = '';
  }

  private Role(): string {
    if (localStorage.getItem("Teacher") !== null)
    {
      return localStorage.getItem("Teacher")!;
    }
    else if (localStorage.getItem("Student") !== null)
    {
      return localStorage.getItem("Student")!;
    }
    else if (localStorage.getItem("Personal") !== null)
    {
      return localStorage.getItem("Personal")!;
    }

    return null!;
  }

  public ChangeVisibilityOfNewPassword(): any {
    if (this.nameKeyNewPassword.nativeElement.value !== "")
    {
      this.Visibility1 = !this.Visibility1;
    }
  }

  public ChangeVisibilityOfCNewPassword(): any {
    if (this.nameKeyCNewPassword.nativeElement.value !== "")
    {
      this.Visibility2 = !this.Visibility2;
    }
  }

  public GetRandomLogin(): any {
    fetch(this.url + 'GetRandomLogin', {
      method: 'GET'
    }).then(text => text.text()).then(data => {
      localStorage.setItem("RandomLogin", data);
    })

    this.nameKey2.nativeElement.value = localStorage.getItem("RandomLogin");
  }
}
