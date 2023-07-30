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

  constructor(private el: ElementRef, private router: Router) {
    localStorage.removeItem("Role");
  }

  public toRegisterProcess(elemRef: any) {
    let element = elemRef;

    let elementId = element.id;

    switch (elementId) {
      case "teacher":
        localStorage.setItem("Role",this.Teacher.nativeElement.innerText);
        break;
      case "student":
        localStorage.setItem("Role",this.Student.nativeElement.innerText);
        break;
    }

    this.router.navigate(['/app/register-form']);
  }

  public ToLoginForm()
  {
    this.router.navigate(['/app/auth-form']);
  }
}
