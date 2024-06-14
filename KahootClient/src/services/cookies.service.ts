import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  setCookie(cname: string, cvalue: string, exdays: number): void {
    const date: Date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires: string = "expires="+date.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  getCookie(cname: string): string {
    let name: string = cname + "=";
    let ca: string[] = document.cookie.split(';');
    for(let i: number = 0; i < ca.length; i++) {
      let c: string = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  checkCookie(cname: string): any{
    return this.getCookie(cname);
  }
}
