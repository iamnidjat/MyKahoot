import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {RegisterFormComponent} from "../register-form/register-form.component";

@Component({
  selector: 'app-profile-dashboard-form',
  templateUrl: './profile-dashboard-form.component.html',
  styleUrls: ['./profile-dashboard-form.component.css']
})

export class ProfileDashboardFormComponent implements OnInit{
  username: string = localStorage.getItem("Login")! || localStorage.getItem("newLogin")!;
  role: string = localStorage.getItem("Role")!.substring(1, localStorage.getItem("Role")!.length - 1);
  name: string = "";
  surname: string = "";
  mail: string = "";
  backUpMail: string = "";
  usernameLabel: string = "You can change your username only once!";
  mailLabel: string = "You can change your mail only once!";
  private url: string = "https://localhost:7176/api/v1/CredentialsChanging/";
  private url2: string = "https://localhost:7176/api/v1/UserInfo/";
  flag1: boolean = false;
  flag2: boolean = false;
  flag3: boolean = false;
  flag4: boolean = false;
  flag5: boolean = false;
  flagHideButton1: boolean = true;
  flagHideButton2: boolean = true;

  constructor(private router: Router, private variable: RegisterFormComponent) {
  }

  private getUserInfo(): void
  {
      fetch(this.url2 + `GetUserInfo?id=${parseInt(localStorage.getItem("userId")!)}`, {
        method: "GET",
      }).then((response) => {
        return response.json();
      }).then((data) => {
        let userinfo = JSON.parse(JSON.stringify(data));
        this.name = JSON.stringify(Object.values(userinfo)[3]).substring(1, JSON.stringify(Object.values(userinfo)[3]).length - 1);
        this.surname = JSON.stringify(Object.values(userinfo)[4]).substring(1, JSON.stringify(Object.values(userinfo)[4]).length - 1);
        this.mail = JSON.stringify(Object.values(userinfo)[6]).substring(1, JSON.stringify(Object.values(userinfo)[6]).length - 1);
        this.backUpMail = JSON.stringify(Object.values(userinfo)[8]).substring(1, JSON.stringify(Object.values(userinfo)[8]).length - 1);
      });
  }

  private changeUsernameChangingToTrue(): void
  {
    fetch(this.url + `ChangeUsernameChangingToTrue?id=${parseInt(localStorage.getItem("userId")!)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  private changeMailChangingToTrue(): void
  {
    fetch(this.url + `ChangeEmailChangingToTrue?id=${parseInt(localStorage.getItem("userId")!)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  private IsUsernameChanged(): boolean
  {
    fetch(this.url2 + `IsUsernameChanged?id=${parseInt(localStorage.getItem("userId")!)}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      localStorage.setItem("IsUsernameChanged", JSON.parse(JSON.stringify(data)));
    });

    return JSON.parse(localStorage.getItem("IsUsernameChanged")!);
  }

  private IsMailChanged(): boolean
  {
    fetch(this.url2 + `IsEmailChanged?id=${parseInt(localStorage.getItem("userId")!)}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      localStorage.setItem("IsMailChanged", JSON.parse(JSON.stringify(data)));
    });

    return JSON.parse(localStorage.getItem("IsMailChanged")!);
  }

  public changeFlag(elemRef: any): void {
    let element = elemRef;

    let elementId = element.id;

    switch (elementId)
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

  back(elemRef: any): void{
    let element = elemRef;

    let elementId = element.id;

    switch (elementId)
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

  setName(e: any, name: string): void{
    e.preventDefault();

    if (name.length >= 2)
    {
      fetch(this.url + `SetName?username=${this.username}&name=${name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.status == 200) {
          this.flag2 = false;
          this.getUserInfo();
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

  setSurname(e: any, surname: string): void{
    e.preventDefault();

    if (surname.length >= 2)
    {
      fetch(this.url + `SetSurname?username=${this.username}&surname=${surname}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.status == 200) {
          this.flag3 = false;
          this.getUserInfo();
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

  setUsername(e: any, username: string): void{
    e.preventDefault();

    if (username.length >= 5 && !this.IsUsernameChanged())
    {
      fetch(this.url + `SetUsername?oldUsername=${this.username}&newUsername=${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.status == 200) {
          this.changeUsernameChangingToTrue();
          this.flag1 = false;

          localStorage.setItem("Login", username);

          this.usernameLabel = "You already changed your username!";
          Swal.fire('You successfully changed your username!');
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

  setMail(e: any, mail: string): void{
    e.preventDefault();

    if (!this.IsMailChanged())
    {
      fetch(this.url + `SetMail?username=${this.username}&mail=${mail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.status == 200) {
          this.changeMailChangingToTrue();
          this.variable.SentConfirmationMail(mail, parseInt(localStorage.getItem("userId")!));
          this.flag5 = false;
          this.getUserInfo();
          this.mailLabel = "You already changed your mail!";
          Swal.fire('You successfully changed your mail! Please confirm your new mail, we have sent an instruction to your mail!');
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

  setBackUpMail(e: any, bMail: string): void{
    e.preventDefault();

    fetch(this.url + `SetBMail?username=${this.username}&bMail=${bMail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.status == 200) {
        this.flag5 = false;
        this.getUserInfo();
        Swal.fire('You successfully set your backup mail!');
      }
      else {
        Swal.fire('Oops', 'Incorrect data!', 'error');
      }
    })
  }

  ToBirthdayChanging(): void{
    this.router.navigate(['app/birthday-settings-form']);
  }

  ToPasswordChanging(): void{
    this.router.navigate(['app/settings-form']);
  }

  ngOnInit(): void {
    this.getUserInfo();

    if (this.IsUsernameChanged())
    {
      this.flagHideButton1 = false;
      this.usernameLabel = "You already changed your username!";
    }

    if (this.IsMailChanged())
    {
      this.flagHideButton2 = false;
      this.mailLabel = "You already changed your mail!";
    }
  }
}
