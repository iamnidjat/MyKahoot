import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {DeleteAccFormComponent} from "../delete-acc-form/delete-acc-form.component";
import Swal from "sweetalert2";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-freeze-acc-popup-form',
  templateUrl: './freeze-acc-popup-form.component.html',
  styleUrls: ['./freeze-acc-popup-form.component.css']
})

export class FreezeAccPopupFormComponent implements AfterViewInit{
  private url: string = "https://localhost:7176/api/v1/Account/";
  private reason: string = "";
  public Visibility: boolean = false;
  @ViewChild('password') password!: ElementRef;
  @ViewChild('WriteTheReason') WriteTheReason!: ElementRef;

  constructor(private router: Router, private sharedService: SharedService,
              private childComponent: DeleteAccFormComponent) {}

  Cancel(): void{
    this.childComponent.flag2 = false;
  }

  checkStatus(e: any): void{
    if(e.target.checked) {
      this.reason = e.target.value;
    }
    else {
      this.reason = this.WriteTheReason.nativeElement.value;
    }
  }

  public async Freeze(e: any): Promise<void>{
    e.preventDefault();

    if (localStorage.getItem("SocialUser") === null)
    {
      if (this.reason != "" && this.sharedService.checkPassword(this.password.nativeElement.value))
      {
        await fetch(this.url + `FreezeAcc?userId=${localStorage.getItem('userId')!}&reason=${this.reason}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }).then((response) => {
          Swal.fire("Your account was frozen!");
          localStorage.removeItem("Login")
          localStorage.removeItem("Username")
          localStorage.removeItem("UsernameDate")
          localStorage.removeItem("userId");
          localStorage.removeItem("userMail");
          localStorage.removeItem("Role");
          localStorage.removeItem("photoURL");
          this.router.navigate(['/app/auth-form']);
        });
      }
    }
    else
    {
      if (this.reason != "" && this.password.nativeElement.value == 'yes')
      {
        await fetch(this.url + `FreezeAcc?userId=${localStorage.getItem('userId')!}&reason=${this.reason}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }).then((response) => {
          Swal.fire("Your account was frozen!");
          localStorage.removeItem("Login")
          localStorage.removeItem("Username")
          localStorage.removeItem("UsernameDate")
          localStorage.removeItem("userId");
          localStorage.removeItem("userMail");
          localStorage.removeItem("Role");
          localStorage.removeItem("photoURL");
          this.router.navigate(['/app/auth-form']);
        });
      }
    }
  }

  public ChangeVisibilityPassword(): any {
    if (this.password.nativeElement.value !== "")
    {
      this.Visibility = !this.Visibility;
    }
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem("SocialUser") !== null)
    {
      this.password.nativeElement.placeholder = "type 'yes'";
    }
  }
}
