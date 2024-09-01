import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

const API_URL: string = "https://localhost:7176/api/v1/Admin/";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly REDIRECT_ROUTE: string = 'app/404-page-form';

  constructor(private router: Router) {}

  public checkAuth(): boolean {
    const isAuthenticated: boolean = !!localStorage.getItem('auth');
    if (!isAuthenticated) {
      this.router.navigate([this.REDIRECT_ROUTE]);
    }
    return isAuthenticated;
  }

  public async sendCredsToEmail(email: string): Promise<void> {
    localStorage.setItem("email", email);
    await fetch(API_URL + `SendCredentials?email=${email}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      return response.text();
    }).then((data) => {
      console.log("creds: ", data);
      localStorage.setItem("password", data);
    }).catch(() => {
      alert("Incorrect login or password");
    });
  }

  public logout(): void {
    localStorage.removeItem("password");
    localStorage.removeItem("email");
    localStorage.removeItem("auth");
    this.router.navigate(['/']);
  }
}
