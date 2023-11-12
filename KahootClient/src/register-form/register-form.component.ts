import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RegisterModel} from "../RegisterModel";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {SocialUser} from "../SocialUser";
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent implements OnInit{
  public Visibility1: boolean = false;
  public Visibility2: boolean = false;
  @ViewChild('newLogin') nameKey2!: ElementRef;
  @ViewChild('newPassword') nameKeyNewPassword!: ElementRef;
  @ViewChild('cNewPassword') nameKeyCNewPassword!: ElementRef;
  @ViewChild('birthday') nameKeyBirthday!: ElementRef;
  @ViewChild('email') nameKeyMail!: ElementRef;

  private url: string = "https://localhost:7176/api/v1/Account/";
  private url2: string = "https://localhost:7176/api/v1/MailConfirmation/";
  private url3: string = "https://localhost:7176/api/v1/UserInfo/";

  constructor(private el: ElementRef, private router: Router, private socialAuthService: SocialAuthService) {
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

  public async Register(e: any, login: string, password: string, cPassword: string, email: string, birthday: string): Promise<void>{
    e.preventDefault();

    let registerModel: RegisterModel = new RegisterModel(login, password, cPassword, email, new Date(birthday), localStorage.getItem("Role")!);

    if (password === cPassword && password.length >= 5 && login.length >= 5 && localStorage.getItem("Role") !== "undefined")
    {
      await fetch(this.url + "Register", {
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
        localStorage.setItem("userMail", JSON.stringify(Object.values(userid)[8]));
        localStorage.setItem("Role", JSON.stringify(Object.values(userid)[13]));
        localStorage.setItem("photoURL", JSON.stringify(Object.values(userid)[15]));
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

  private async AddSocialUser(username: string, name: string, email: string, role: string, provider: string): Promise<void>{
    let user: SocialUser = new SocialUser(username, name, email, role, provider);

    await fetch(this.url + "AddSocialUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
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

  public async GetRandomLogin(): Promise<any> {
    await fetch(this.url + 'GetRandomLogin', {
      method: 'GET'
    }).then(text => text.text()).then(data => {
      localStorage.setItem("RandomLogin", data);
    });

    this.nameKey2.nativeElement.value = localStorage.getItem("RandomLogin");
  }

  ngOnInit(): void {
    this.RegisterSocialUser(); // !
  }

  public RegisterSocialUser(): void{
    this.socialAuthService.authState.subscribe((user) => {
      localStorage.setItem("Login", user.name);
      localStorage.setItem("SocialUser", "true");
      this.AddSocialUser(user.name, user.firstName, user.email, localStorage.getItem("Role")!, user.provider);
      Swal.fire("You registered successfully!"); // !
      this.router.navigate(['/app/player-options-form']);
    });
  }
}
