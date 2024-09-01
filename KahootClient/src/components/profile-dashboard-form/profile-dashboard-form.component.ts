import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {SharedService} from "../../services/shared.service";
import {TranslateService} from "@ngx-translate/core";

const API_URL: string = "https://localhost:7176/api/v1/CredentialsChanging/";
const API_URL2: string = "https://localhost:7176/api/v1/Message/";

@Component({
  selector: 'app-profile-dashboard-form',
  templateUrl: './profile-dashboard-form.component.html',
  styleUrls: ['./profile-dashboard-form.component.css']
})
export class ProfileDashboardFormComponent implements OnInit{
  public username: string = localStorage.getItem("Login")!;
  public role: string = localStorage.getItem("Role")!;
  public name: string = "";
  public surname: string = "";
  public mail: string = "";
  public backUpMail: string = "";
  public provider: string = "";
  public usernameLabel: string = "You can change your username only once!";
  public mailLabel: string = "You can change your mail only once!";
  public nameLabel: string = "You can't change your name!"; // for social user
  public flag1: boolean = false; // flag for username
  public flag2: boolean = false; // flag for name
  public flag3: boolean = false; // flag for surname
  public flag4: boolean = false; // flag for mail
  public flag5: boolean = false; // flag for backup mail
  public flagHideButton1: boolean = true; // flag for hiding change button for username
  public flagHideButton2: boolean = true; // flag for hiding change button for mail
  public isSocialUser: boolean = JSON.parse(localStorage.getItem("SocialUser")!);
  public isMailConfirmed: boolean = false;
  public isMailChanged: boolean = false;
  public isUsernameChanged: boolean = false;
  public messagesCount: number = 0;

  constructor(private router: Router, private sharedService: SharedService,
              private translate: TranslateService) {}

  private async getUserInfoAsync(): Promise<void> {
    const data = await this.sharedService.getUserInfoAsync();

    this.name = data.name;
    this.surname = data.surname;
    this.mail = data.email;
    this.backUpMail = data.backUpEmail;
    this.provider = data.provider;
    this.isMailConfirmed = data.isEmailConfirmed;
    this.isMailChanged = data.isEmailChanged;
    this.isUsernameChanged = data.isUsernameChanged;
  }


  private async changeUsernameChangingToTrue(): Promise<void> {
    await fetch(API_URL + `ChangeUsernameChangingToTrue?id=${parseInt(localStorage.getItem("userId")!)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  private async changeMailChangingToTrue(): Promise<void> {
    await fetch(API_URL + `ChangeEmailChangingToTrue?id=${parseInt(localStorage.getItem("userId")!)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public changeFlag(elemRef: any): void { // change flags to true that will allow us to change credentials (for non-social users)
    switch (elemRef.id)
    {
      case "flag1":
        this.flag1 = true;
        break;
      case "flag2":
        this.flag2 = true;
        break;
      case "flag3":
        this.flag3 = true;
        break;
      case "flag4":
        this.flag4 = true;
        break;
      case "flag5":
        this.flag5 = true;
        break;
    }
  }

  public back(elemRef: any): void{ // return the flags to their original values (for non-social users)
    switch (elemRef.id)
    {
      case "flag11":
        this.flag1 = false;
        break;
      case "flag21":
        this.flag2 = false;
        break;
      case "flag31":
        this.flag3 = false;
        break;
      case "flag41":
        this.flag4 = false;
        break;
      case "flag51":
        this.flag5 = false;
        break;
    }
  }

  public changeFlag2(elemRef: any): void { // change flags to true that will allow us to change credentials (for social users)
    switch (elemRef.id)
    {
      case "flag32":
        this.flag1 = true;
        break;
      case "flag52":
        this.flag2 = true;
        break;
    }
  }

  public back2(elemRef: any): void{ // return the flags to their original values (for social users)
    switch (elemRef.id)
    {
      case "flag312":
        this.flag3 = false;
        break;
      case "flag512":
        this.flag5 = false;
        break;
    }
  }

  public async setName(e: any, name: string): Promise<void>{
    e.preventDefault();

    if (name.length >= 2)
    {
      await fetch(API_URL + `SetName?username=${this.username}&name=${name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.status == 200) {
          this.flag2 = false;
          this.getUserInfoAsync();
          Swal.fire('You successfully set your name!');
        }
        else {
          Swal.fire('Oops', 'Incorrect data!', 'error');
        }
      })
    }
    else
    {
      Swal.fire('Oops', 'Incorrect data!', 'error');
    }
  }

  public async setSurname(e: any, surname: string): Promise<void>{
    e.preventDefault();

    if (surname.length >= 2)
    {
      await fetch(API_URL + `SetSurname?username=${this.username}&surname=${surname}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.status == 200) {
          this.flag3 = false;
          this.getUserInfoAsync();
          Swal.fire('You successfully set your surname!');
        }
        else {
          Swal.fire('Oops', 'Incorrect data!', 'error');
        }
      })
    }
    else
    {
      Swal.fire('Oops', 'Incorrect data!', 'error');
    }
  }

  public async setUsername(e: any, username: string): Promise<void>{
    e.preventDefault();

    if (username.length >= 5)
    {
      await fetch(API_URL + `SetUsername?oldUsername=${this.username}&newUsername=${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.status == 200) {
          this.changeUsernameChangingToTrue();
          this.flag1 = false;
          localStorage.setItem("Login", username);
          this.getUserInfoAsync();
          this.usernameLabel = "You already changed your username!";
          Swal.fire('You successfully changed your username!');
        }
        else {
          Swal.fire('Oops', 'User with this username already exists!', 'error');
        }
      })
    }
    else
    {
      Swal.fire('Oops', 'Your new username has to contain at least 5 symbols!', 'error');
    }
  }

  public async setMail(e: any, mail: string): Promise<void>{
    e.preventDefault();

    if (mail !== "" && this.isValidEmail(mail)) // improve this if statement
    {
      await fetch(API_URL + `SetMail?username=${this.username}&mail=${mail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.status == 200) {
          this.changeMailChangingToTrue();
          this.sharedService.SentConfirmationMail(mail, parseInt(localStorage.getItem("userId")!));
          this.flag5 = false;
          this.getUserInfoAsync();
          this.mailLabel = "You already changed your mail!";
          Swal.fire('You successfully changed your mail! Please confirm your new mail, we have sent an instruction to your mail!');
        }
        else {
          Swal.fire('Oops', 'User with this mail already exists!', 'error');
        }
      })
    }
    else
    {
      Swal.fire('Oops', 'Please fill the mail field!', 'error');
    }
  }

  public async setBackUpMail(e: any, bMail: string): Promise<void>{
    e.preventDefault();

    if (bMail !== "" && this.isValidEmail(bMail))
    {
      await fetch(API_URL + `SetBMail?username=${this.username}&bMail=${bMail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.status == 200) {
          this.flag5 = false;
          this.getUserInfoAsync();
          Swal.fire('You successfully set your backup mail!');
        }
        else {
          Swal.fire('Oops', 'Incorrect data!', 'error');
        }
      })
    }
    else {
      Swal.fire('Oops', 'Please fill the backup mail field!', 'error');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public ToBirthdayChanging(): void {
    this.router.navigate(['app/birthday-settings-form']);
  }

  public ToPasswordChanging(): void {
    this.router.navigate(['app/settings-form']);
  }

  public onMyPurchasesClick(): void {
    this.router.navigate(['/app/my-purchases', parseInt(localStorage.getItem("userId")!)]);
  }

  ngOnInit(): void {
    this.initAsync();
  }

  private async initAsync(): Promise<void> {
      await this.getUserInfoAsync();

      if (this.isSocialUser) {
        this.usernameLabel = 'You can\'t change your username!';
        this.mailLabel = "You can't change your mail!";
      } else {
      if (this.isUsernameChanged) {
        this.flagHideButton1 = false;
        this.usernameLabel = 'You already changed your username!';
      }
      if (this.isMailChanged) {
        this.flagHideButton2 = false;
        this.mailLabel = "You already changed your mail!";
      }

      this.messagesCount = await this.getMessagesCountAsync();
    }

    localStorage.removeItem("IsMailChanged");
    localStorage.removeItem("IsUsernameChanged");
  }

  public async getMessagesCountAsync(): Promise<number> {
    try {
      const response = await fetch(API_URL2 + `GetMessagesCount?userName=${localStorage.getItem("Login")}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch messages count', error);
      return -1; // Rethrow the error after logging it
    }
  }
}
