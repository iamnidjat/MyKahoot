import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";

@Component({
  selector: 'app-delete-acc-form',
  templateUrl: './delete-acc-form.component.html',
  styleUrls: ['./delete-acc-form.component.css']
})

export class DeleteAccFormComponent implements OnInit, AfterViewInit{
  flag: boolean = false;
  flag2: boolean = false;
  reason: string = "";
  @ViewChild('password') var!: ElementRef;
  private url: string = "https://localhost:7176/api/v1/Account/";
  public Visibility: boolean = false;

  constructor() {

  }

  checkStatus(e: any): void{
    if(e.target.checked){
      this.reason = e.target.value;
    }
  }

  checkPassword(password: string): boolean{
    fetch(this.url + `PasswordsMatching?userId=${parseInt(localStorage.getItem("userId")!)}&password=${password}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log( JSON.parse(JSON.stringify(data)));
      localStorage.setItem("DoesMatch", JSON.parse(JSON.stringify(data)));
    });

    return JSON.parse(localStorage.getItem("DoesMatch")!);
  }

  OpenModal(e: any): void{ // !
    this.checkStatus(e);

    if (localStorage.getItem("SocialUser") == null)
    {
      if (this.reason != "" && this.checkPassword(this.var.nativeElement.value))
      {
        this.flag = true;
      }
      else
      {
        Swal.fire('Oops', 'Either you did not specify a reason or you did not specify password properly!', 'error');
      }
    }
    else
    {
      if (this.reason != "" && this.var.nativeElement.value == 'yes')
      {
        this.flag = true;
      }
      else
      {
        Swal.fire('Oops', 'Either you did not specify a reason or you did not specify password properly!', 'error');
      }
    }
  }

  OpenModal2(): void{
    this.flag2 = true;
  }

  public ChangeVisibilityPassword(): any {
    if (this.var.nativeElement.value !== "")
    {
      this.Visibility = !this.Visibility;
    }
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (localStorage.getItem("SocialUser") != null)
    {
      this.var.nativeElement.placeholder = "type 'yes'";
    }
  }
}
