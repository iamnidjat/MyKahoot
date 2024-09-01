import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Location} from "@angular/common";

@Component({
  selector: 'app-birthday-settings-form',
  templateUrl: './birthday-settings-form.component.html',
  styleUrls: ['./birthday-settings-form.component.css']
})
export class BirthdaySettingsFormComponent {
  private url: string = "https://localhost:7176/api/v1/Account/";
  @ViewChild('newBirthday') newBirthday!: ElementRef;
  constructor(private router: Router, private location: Location) {}

  private getDifferenceInYears(date1: Date, date2: Date): number {
    const yearDiff: number = date1.getFullYear() - date2.getFullYear();
    const monthDiff: number = date1.getMonth() - date2.getMonth();
    return (monthDiff < 0 || (monthDiff === 0 && date1.getDate() < date2.getDate())) ? yearDiff - 1 : yearDiff;
  }

  public async changeBirthday(e:any, newBirthday: string): Promise<void> {
    e.preventDefault();

    if (!localStorage.getItem("SocialUser"))
    {
      if (newBirthday !== '' && this.getDifferenceInYears(new Date(), new Date(newBirthday))) {
        await fetch(this.url + `ChangeBirthday?login=${localStorage.getItem("Login")}&newBirthday=${new Date(newBirthday).toISOString()}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          }
        }).then((response) => {
          console.log(response);
          if (response.status == 200) {
            Swal.fire('Your birthday was altered successfully!');
            this.router.navigate(['/app/settings-choice-form']);
          } else {
            Swal.fire('Oops', 'Incorrect data!', 'error');
            this.newBirthday.nativeElement.value = '';
          }
        });
      } else {
        Swal.fire('Oops', 'Incorrect data!', 'error');
        this.newBirthday.nativeElement.value = '';
      }
    }
    else {
      Swal.fire('Oops', 'You are not eligible to change your birthday!', 'error');
      this.newBirthday.nativeElement.value = '';
    }
  }

  public backOptions(): void {
    this.location.back();
  }
}
