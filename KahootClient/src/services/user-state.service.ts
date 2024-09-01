import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

const API_URL: string = "https://localhost:7176/api/v1/Admin/";

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  public async isUserBannedAsync(): Promise<boolean> {
    try {
      const response = await fetch(API_URL + `IsUserBanned?userId=${parseInt(localStorage.getItem("userId")!)}`);
      const data = await response.json();
      if (data) {
        await this.unBanUserAsync();
        return false;
      }
      return data;
    }
    catch (error) {
      console.error("Error in isUserBannedAsync:", error);
      return false;
    }
  }

  private async unBanUserAsync(): Promise<void> {
    try {
      const response = await fetch(API_URL + `UnbanUser?userId=${parseInt(localStorage.getItem("userId")!)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

    const data = await response.json();
    console.log("unBanUserAsync", data);
    if (response.status === 200 && data.success) {
      Swal.fire("Your account was unbanned.");
    } else if (response.status === 400 && data.reason === "not_expired") {
      Swal.fire("2 days were not expired yet, your account is still banned.");
    } else if (response.status === 404 && data.reason === "not_found") {
      Swal.fire("The user was not found. Please try again later.");
    } else {
      Swal.fire("Something went wrong, try again later.");
    }
   }
    catch (error) {
        console.error("Error in unBanUserAsync:", error);
        Swal.fire("Something went wrong, try again later.");
    }
  }
}
