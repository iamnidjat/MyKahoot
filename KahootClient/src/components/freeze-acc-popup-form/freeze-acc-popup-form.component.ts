import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {SharedService} from "../../services/shared.service";

const API_URL: string = "https://localhost:7176/api/v1/Account/";

@Component({
  selector: 'app-freeze-acc-popup-form',
  templateUrl: './freeze-acc-popup-form.component.html',
  styleUrls: ['./freeze-acc-popup-form.component.css']
})

export class FreezeAccPopupFormComponent implements AfterViewInit{
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  private reason: string = "";
  public Visibility: boolean = false;
  @ViewChild('password') password!: ElementRef;
  @ViewChild('WriteTheReason') WriteTheReason!: ElementRef;

  constructor(private router: Router, private sharedService: SharedService) {}

  public Cancel(): void{
    this.close.emit();
  }

  public checkStatus(e: any): void{
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
      if (this.reason != "" && await this.sharedService.checkPasswordAsync(this.password.nativeElement.value))
      {
        await fetch(API_URL  + `FreezeAcc?userId=${localStorage.getItem('userId')!}&reason=${this.reason}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }).then(() => {
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
        await fetch(API_URL + `FreezeAcc?userId=${localStorage.getItem('userId')!}&reason=${this.reason}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }).then(() => {
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
