import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css']
})
export class ForgotPasswordFormComponent {
  constructor() {
  }

  public ResetPassword(e: any, email: string): void{
    e.preventDefault();
    // fetch(this.url + "Register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(registerModel)
    // }).then((response) => {
    //   localStorage.setItem("Login",this.nameKey.nativeElement.value)
    //   this.router.navigate(['/app/player-options-form']);
    // });
  }
}
