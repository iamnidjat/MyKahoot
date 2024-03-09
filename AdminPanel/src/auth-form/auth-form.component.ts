import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})

export class AuthFormComponent{
  public isDisabled: boolean = true;
  private url: string = "https://localhost:7176/api/v1/Admin/";
  public Visibility: boolean = false;
  @ViewChild('Login') nameKey!: ElementRef;
  @ViewChild('Guest') nameKey3!: ElementRef;
  @ViewChild('Password') nameKeyPassword!: ElementRef;

  constructor(private el: ElementRef, private router: Router) {

  }

  public async LogIn(e: any, email: string, myLogin: string, myPassword: string): Promise<void>{
    e.preventDefault();

    if (email !== '' && myLogin !== '' && myPassword !== '')
    {
      await fetch(this.url + `SendCredentials?email=${email}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        return response.json();
      }).then((data) => {
        let creds = JSON.parse(JSON.stringify(data));
        let login: string = JSON.stringify(Object.values(creds)[0]);
        let password: string = JSON.stringify(Object.values(creds)[1]);

        if (login == myLogin && password == myPassword)
        {
          this.router.navigate(['/app/']);
        }
        else{
          Swal.fire('Oops', 'Either password is correct or login is correct!', 'error');
        }
      });
    }
    else{
      Swal.fire('Oops', 'Incorrect data!', 'error');
      this.ClearLoginInputs();

      if (this.Visibility)
      {
        this.Visibility = !this.Visibility;
      }
    }
  }

  public IsLoginFieldEmpty(): any{
    this.isDisabled = !this.isDisabled;
  }


  public ChangeVisibility(): any {
    if (this.nameKeyPassword.nativeElement.value !== "")
    {
      this.Visibility = !this.Visibility;
    }
  }

  private ClearLoginInputs(): any
  {
    this.nameKey.nativeElement.value = '';
    this.nameKeyPassword.nativeElement.value = '';
  }
}

