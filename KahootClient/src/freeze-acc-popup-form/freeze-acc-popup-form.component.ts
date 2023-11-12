import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {DeleteAccFormComponent} from "../delete-acc-form/delete-acc-form.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-freeze-acc-popup-form',
  templateUrl: './freeze-acc-popup-form.component.html',
  styleUrls: ['./freeze-acc-popup-form.component.css']
})

export class FreezeAccPopupFormComponent implements AfterViewInit{
  private url: string = "https://localhost:7176/api/v1/Account/";
  private reason: string = "";
  @ViewChild('password') var!: ElementRef;
  public Visibility: boolean = false;

  constructor(private router: Router, private flag: DeleteAccFormComponent, private variable: DeleteAccFormComponent) {
  }

  Cancel(): void{
    this.flag.flag2 = false;
  }

  checkStatus(e: any): void{
    if(e.target.checked){
      this.reason = e.target.value;
    }
  }

  public async Freeze(e: any): Promise<void>{
    e.preventDefault();

    if (localStorage.getItem("SocialUser") == null)
    {
      if (this.reason != "" && this.variable.checkPassword(this.var.nativeElement.value))
      {
        this.checkStatus(e);

        await fetch(this.url + `FreezeAcc?userId=${localStorage.getItem('userId')!}&reason=${this.reason}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }).then((response) => {
          Swal.fire("Your account was frozen!");
          this.router.navigate(['/app/auth-form']);
        });
      }
    }
    else
    {
      if (this.reason != "" && this.var.nativeElement.value == 'yes')
      {
        this.checkStatus(e);

        await fetch(this.url + `FreezeAcc?userId=${localStorage.getItem('userId')!}&reason=${this.reason}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }).then((response) => {
          Swal.fire("Your account was frozen!");
          this.router.navigate(['/app/auth-form']);
        });
      }
    }
  }

  public ChangeVisibilityPassword(): any {
    if (this.var.nativeElement.value !== "")
    {
      this.Visibility = !this.Visibility;
    }
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem("SocialUser") != null)
    {
      this.var.nativeElement.placeholder = "type 'yes'";
    }
  }
}
