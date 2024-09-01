import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public async canUserCreateVIPAsync(userId: number): Promise<boolean> {
    try {
      const response = await fetch(API_URL + `CanUserCreateVIPQuiz?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.status === 200 && data.success) {
        Swal.fire("You can create a VIP quiz.");
        return true;
      } else if (response.status === 400 && data.reason === "insufficient_coins") {
        Swal.fire("You cannot create a VIP quiz due to insufficient coins.");
        return false;
      } else {
        Swal.fire("Something went wrong, try again later.");
        return false;
      }
    } catch (error) {
      console.error("Error in canUserCreateVIPAsync:", error);
      Swal.fire("Something went wrong, try again later.");
      return false;
    }
  }

  public async canUserPassVIPAsync(userId: number): Promise<boolean> {
    try {
      const response = await fetch(API_URL + `CanUserPassVIPQuiz?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.status === 200 && data.success) {
        Swal.fire("You can pass a VIP quiz.");
        return true;
      } else if (response.status === 400 && data.reason === "insufficient_coins") {
        Swal.fire("You cannot pass a VIP quiz due to insufficient coins.");
        return false;
      } else {
        Swal.fire("Something went wrong, try again later.");
        return false;
      }
    } catch (error) {
      console.error("Error in canUserPassVIPAsync:", error);
      Swal.fire("Something went wrong, try again later.");
      return false;
    }
  }
}
