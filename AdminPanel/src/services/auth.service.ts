import { Injectable } from '@angular/core';

const API_URL: string = "https://localhost:7176/api/v1/Admin/";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public async Login(email: string): Promise<void> {
    await fetch(API_URL + `SendCredentials?email=${email}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      return response.text();
    }).then((data) => {
      console.log("creds: ", data);
      localStorage.setItem("login", data[0]);
      localStorage.setItem("password", data[1]);
    }).catch(() => {
      alert("Incorrect login or password");
    });
  }

  public Logout(): void {
    localStorage.removeItem("login");
    localStorage.removeItem("password");
  }
}
