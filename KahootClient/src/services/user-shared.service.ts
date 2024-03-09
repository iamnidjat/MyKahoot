import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSharedService {
  public get userRole(): string {
    return localStorage.getItem("Role")!.substring(1, localStorage.getItem("Role")!.length - 1);
  }
}
