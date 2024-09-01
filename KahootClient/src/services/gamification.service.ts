import { Injectable } from '@angular/core';

const API_URL: string = "https://localhost:7176/api/v1/Gamification/";

@Injectable({
  providedIn: 'root'
})
export class GamificationService {

  public async upgradeLevelAsync(): Promise<boolean> {
    try {
      const response = await fetch(API_URL + `UpgradeLevel?userId=${parseInt(localStorage.getItem("userId")!)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      console.log("upgradeLevelAsync => ", data);

      // Check the response data to decide if the operation was successful
      if (data) {
        await this.getGamificationStatsAsync();
        return true;
      } else {
        console.error("Upgrade failed:", data);
        return false;
      }
    } catch (error) {
      console.error("Error in upgradeLevelAsync:", error);
      return false;
    }
  }

  public async getGamificationStatsAsync(): Promise<void> {
    await fetch(API_URL + `GetGamificationStats?userId=${parseInt(localStorage.getItem("userId")!)}`, {
      method: "GET",
    }).then((response) => {
      return response.json()
    }).then((data) => {
      localStorage.setItem("userLevel", data[0]);
      localStorage.setItem("points", data[1]);
      localStorage.setItem("overallPoints", data[2]);
      localStorage.setItem("coins", data[3]);
    }).catch((error) => {
      console.error("Error in getGamificationStatsAsync:", error);
    });
  }
}
