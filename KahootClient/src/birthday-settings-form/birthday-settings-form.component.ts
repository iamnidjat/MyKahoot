import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-birthday-settings-form',
  templateUrl: './birthday-settings-form.component.html',
  styleUrls: ['./birthday-settings-form.component.css']
})
export class BirthdaySettingsFormComponent {
  private url: string = "https://localhost:7176/api/v1/Account/";
  @ViewChild('oldBirthday') nameKeyBirthday!: ElementRef;
  @ViewChild('newBirthday') nameKeyNewBirthday!: ElementRef;
  @ViewChild('cNewBirthday') nameKeyCNewBirthday!: ElementRef;
  constructor(private router: Router) {
  }

  public async changeBirthday(e:any, oldBirthday: string, newBirthday: string, cNewBirthday: string): Promise<void> {
    e.preventDefault();

    if (newBirthday === cNewBirthday)
    {
      await fetch(this.url + `ChangeBirthday?login=${localStorage.getItem("Login") || localStorage.getItem("newLogin")}&oldBirthday=${new Date(oldBirthday).toISOString()}&newBirthday=${new Date(newBirthday).toISOString()}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        console.log(response);
        if (response.status == 200)
        {
          Swal.fire('Your birthday was altered successfully!');
          this.router.navigate(['/app/settings-choice-form']);
        }
        else
        {
          Swal.fire('Oops', 'Incorrect data!', 'error');
          this.ClearChangeBirthdayInputs();
        }
      });
    }
    else
    {
      Swal.fire('Oops', 'Incorrect data!', 'error');
      this.ClearChangeBirthdayInputs();
    }
  }

  private ClearChangeBirthdayInputs(): any
  {
    this.nameKeyNewBirthday.nativeElement.value = '';
    this.nameKeyCNewBirthday.nativeElement.value = '';
    this.nameKeyBirthday.nativeElement.value = '';
  }
}
