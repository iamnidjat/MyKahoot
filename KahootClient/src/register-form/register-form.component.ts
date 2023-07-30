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
  private url2: string = "https://localhost:7176/api/v1/MailConfirmation/";

  constructor(private el: ElementRef, private router: Router) {
    localStorage.removeItem("newLogin");
    localStorage.removeItem("RandomLogin");
  }

  public SentConfirmationMail(email: string, userId: number): void
  {
    fetch(this.url2 + `ConfirmEmail?email=${email}&userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  public Register(e: any, login: string, password: string, cPassword: string, email: string, birthday: string): void{
    e.preventDefault();

    let registerModel: RegisterModel = new RegisterModel(login, password, cPassword, email, new Date(birthday), localStorage.getItem("Role")!);

    if (password === cPassword && password.length >= 5 && login.length >= 5 && localStorage.getItem("Role") !== "undefined")
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
          Swal.fire("You registered successfully! Please confirm your account, we have sent an instruction to your mail");
          this.router.navigate(['/app/player-options-form']);
        }
        else
        {
          Swal.fire('Oops', 'Incorrect data (check your age and other data and remember you must be 16 years or older)!', 'error');
          this.ClearRegisterInputs();
          this.Visibility1 ? this.Visibility1 = !this.Visibility1 : this.Visibility1;
          this.Visibility2 ? this.Visibility2 = !this.Visibility2 : this.Visibility2;
        }
        return response.json();
      }).then((data) => {
        let userid = JSON.parse(JSON.stringify(data));
        localStorage.setItem("userId", JSON.stringify(Object.values(userid)[0]));
        localStorage.setItem("Role", JSON.stringify(Object.values(userid)[11]));
        this.SentConfirmationMail(email, parseInt(localStorage.getItem("userId")!));
      });
    }
    else
    {
      Swal.fire('Oops', 'Incorrect data!', 'error');
      this.ClearRegisterInputs();
      this.Visibility1 ? this.Visibility1 = !this.Visibility1 : this.Visibility1;
      this.Visibility2 ? this.Visibility2 = !this.Visibility2 : this.Visibility2;
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
    });

    this.nameKey2.nativeElement.value = localStorage.getItem("RandomLogin");
  }
}
