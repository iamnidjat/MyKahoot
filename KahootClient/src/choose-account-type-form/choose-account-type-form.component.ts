import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-choose-account-type-form',
  templateUrl: './choose-account-type-form.component.html',
  styleUrls: ['./choose-account-type-form.component.css']
})
export class ChooseAccountTypeFormComponent {
  @ViewChild("Teacher") Teacher!: ElementRef;
  @ViewChild("Student") Student!: ElementRef;
  @ViewChild("Personal") Personal!: ElementRef;

  constructor(private el: ElementRef, private router: Router) {
    localStorage.removeItem("Teacher");
    localStorage.removeItem("Student");
    localStorage.removeItem("Personal");
  }

  public toRegisterProcess(elemRef: any) {
    let element = elemRef;

    let elementId = element.id;

    switch (elementId) {
      case "teacher":
        localStorage.setItem("Teacher",this.Teacher.nativeElement.innerText);
        break;
      case "student":
        localStorage.setItem("Student",this.Student.nativeElement.innerText);
        break;
      case "personal":
        localStorage.setItem("Personal",this.Personal.nativeElement.innerText);
        break;
    }

    this.router.navigate(['/app/register-form']);
  }

  public ToLoginForm()
  {
    this.router.navigate(['/app/auth-form']);
  }
}
