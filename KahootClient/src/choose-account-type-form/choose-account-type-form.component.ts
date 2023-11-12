import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {RegisterFormComponent} from "../register-form/register-form.component";

@Component({
  selector: 'app-choose-account-type-form',
  templateUrl: './choose-account-type-form.component.html',
  styleUrls: ['./choose-account-type-form.component.css']
})
export class ChooseAccountTypeFormComponent {
  @ViewChild("Teacher") Teacher!: ElementRef;
  @ViewChild("Student") Student!: ElementRef;

  constructor(private el: ElementRef, private router: Router, private variable: RegisterFormComponent) {
    localStorage.removeItem("Role");
  }

  public toRegisterProcess(elemRef: any) {
    let element = elemRef;

    let elementId = element.id;

    if (localStorage.getItem("SocialUserFlag") !== null) {
      switch (elementId) {
        case "teacher":
          localStorage.setItem("Role", this.Teacher.nativeElement.innerText);
          this.variable.RegisterSocialUser();
          localStorage.removeItem("SocialUserFlag");
          this.router.navigate(['/app/player-options-form']);
          break;
        case "student":
          localStorage.setItem("Role", this.Student.nativeElement.innerText);
          this.variable.RegisterSocialUser();
          localStorage.removeItem("SocialUserFlag");
          this.router.navigate(['/app/player-options-form']);
          break;
      }
    }
    else
    {
      switch (elementId) {
        case "teacher":
          localStorage.setItem("Role",this.Teacher.nativeElement.innerText);
          localStorage.removeItem("SocialUserFlag");
          break;
        case "student":
          localStorage.setItem("Role",this.Student.nativeElement.innerText);
          localStorage.removeItem("SocialUserFlag");
          break;
      }

      this.router.navigate(['/app/register-form']);
    }
  }

  public ToLoginForm(): void
  {
    this.router.navigate(['/app/auth-form']);
  }
}
