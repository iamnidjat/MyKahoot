import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

const API_URL: string = "https://localhost:7176/api/v1/Admin/";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  public async sendCredsToEmail(email: string): Promise<void> {
    localStorage.setItem("email", email);
    await fetch(API_URL + `SendCredentials?email=${email}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      console.log("response", response);
      return response.text();
    }).then((data) => {
      console.log("creds: ", data);
      localStorage.setItem("password", data);
    }).catch(() => {
      alert("Incorrect login or password");
    });
  }

  public logout(): void {
    localStorage.removeItem("login");
    localStorage.removeItem("password");
    this.router.navigate(['/']);
  }
}
