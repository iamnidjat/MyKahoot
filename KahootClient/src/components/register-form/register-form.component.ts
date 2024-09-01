import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RegisterModel} from "../../models/RegisterModel";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {CheckCredentialsService} from "../../services/check-credentials.service";
import {NgxSpinnerService} from "ngx-spinner";

const API_URL: string = "https://localhost:7176/api/v1/Account/";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit{
  public visibility1: boolean = false; // for newPassword visibility
  public visibility2: boolean = false; // for cNewPassword visibility
  public isEmailUsed: boolean = false;
  public mySelectedDate: any;
  public newLogin: string = "";
  public newPassword: string = "";
  public cNewPassword: string = "";
  public mail: string = "";

  constructor(private el: ElementRef, private router: Router,
              private sharedService: SharedService, private spinner: NgxSpinnerService,
              private checkCredsService: CheckCredentialsService) {}

  public async RegisterAsync(e: any): Promise<void>{
    e.preventDefault();

    if (await this.checkCredsService.IsEmailUsed(this.mail)) {
        this.isEmailUsed = true;
    }
    else if (this.newLogin === "admin" || this.newLogin === "Admin") {
      Swal.fire('Oops', 'admin/Admin is a reserved login, you can not use it!', 'error');
    }
    else {
      if (this.newPassword === this.cNewPassword && this.newPassword.length >= 5 && this.newLogin.length >= 5 && localStorage.getItem("Role"))
      {
        this.spinner.show();

        let registerModel: RegisterModel = {userName: this.newLogin, password: this.newPassword, confirmPassword: this.cNewPassword,
          email: this.mail, birthday: new Date(this.mySelectedDate), role: localStorage.getItem("Role")!}

        await fetch(API_URL + "Register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(registerModel)
        }).then((response) => {
          if (response.status == 200)
          {
            localStorage.setItem("Login", this.newLogin);
            localStorage.removeItem("RandomLogin") // Don't need anymore
            Swal.fire("You registered successfully! Please confirm your account, we have sent an instruction to your mail." +
              "Otherwise you will not be able to get points and coins.");
            this.router.navigate(['/app/player-options-form']);
          }
          else
          {
            Swal.fire('Oops', 'This username is already in use!', 'error');
            this.ClearRegisterInputs();
            this.visibility1 ? this.visibility1 = !this.visibility1 : this.visibility1;
            this.visibility2 ? this.visibility2 = !this.visibility2 : this.visibility2;
          }
          return response.json();
        }).then((data) => {
          localStorage.setItem("userId", data.id);
          localStorage.setItem("userMail", data.email);
          localStorage.setItem("Role", data.role);
          localStorage.setItem("overallPoints", data.overallPoints);
          localStorage.setItem("userLevel", data.level);
          localStorage.setItem("points", data.points);
          localStorage.setItem("coins", data.coins);
          localStorage.setItem("userPhoto", data.photo);
          this.sharedService.SentConfirmationMail(this.mail, parseInt(localStorage.getItem("userId")!));
        }).catch((error) => {
          console.error("Error in RegisterAsync:", error);
          Swal.fire("Something went wrong, try again later.");
        }).finally(() => {
          this.spinner.hide();
        });
      }
      else
      {
        Swal.fire('Oops', 'Your passwords must match and your password and login must contain at least 5 characters!', 'error');
        this.ClearRegisterInputs();
        this.visibility1 ? this.visibility1 = !this.visibility1 : this.visibility1;
        this.visibility2 ? this.visibility2 = !this.visibility2 : this.visibility2;
      }
    }
    localStorage.removeItem("IsEmailUsed"); // Don't need anymore
  }

  private ClearRegisterInputs(): any
  {
    this.newLogin = '';
    this.newPassword = '';
    this.cNewPassword = '';
    this.mySelectedDate = '';
    this.mail = '';
  }

  public ChangeVisibilityOfPasswordField(password: string, propertyName: 'visibility1' | 'visibility2'): void {
    if (password !== "")
    {
      this[propertyName] = !this[propertyName];
    }
  }

  public async GetRandomLogin(): Promise<void> {
    await fetch(API_URL + 'GetRandomLogin', {
      method: 'GET'
    }).then(text => text.text()).then(data => {
      localStorage.setItem("RandomLogin", data);
    });

    this.newLogin = localStorage.getItem("RandomLogin")!;
  }

  ngOnInit(): void {
    this.sharedService.RegisterSocialUser();
  }
}
