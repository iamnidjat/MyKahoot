import { Injectable } from '@angular/core';
import {ItemToBuy} from "../models/ItemToBuy";
import Swal from "sweetalert2";
import {SharedService} from "./shared.service";

const API_URL: string = "https://localhost:7176/api/v1/ItemStore/";

@Injectable({
  providedIn: 'root'
})
export class MykahootstoreService {
  constructor(private sharedService: SharedService) {}

  public async getAllItemsAsync(items: ItemToBuy[]): Promise<void> {
    await fetch(API_URL + `GetAllItems`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      Object.keys(data).forEach((key) =>
      {
        items.push(data[key]);
      });
    })
  }

  public async getUserItemsAsync(userId: number, items: ItemToBuy[]): Promise<void> {
    await fetch(API_URL + `GetUserItems?userId=${userId}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      Object.keys(data).forEach((key) =>
      {
        items.push(data[key]);
      });
    })
  }

  public async buyAnItemAsync(itemId: number, userId: number, quantity: number, address: string, city: string, country: string): Promise<void> {
    try {
      const response = await fetch(API_URL + `BuyItem?itemId=${itemId}&userId=${userId}&quantity=${quantity}&address=${address}&city=${city}&country=${country}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.status === 200 && data.success) {
        Swal.fire("You successfully bought this item.");
        await this.sharedService.GetUserInfoByUsername(localStorage.getItem("Login")!);
      } else if (response.status === 400 && data.reason === "insufficient_coins") {
        Swal.fire("You cannot buy this item due to insufficient coins.");
      } else if (response.status === 404 && data.reason === "not_found") {
        Swal.fire("The item record was not found. Please try again later.");
      } else {
        Swal.fire("Something went wrong, try again later.");
      }
    } catch (error) {
      console.error("Error in buyAnItemAsync:", error);
      Swal.fire("Something went wrong, try again later.");
    }
  }

  public async returnPurchaseAsync(itemId: number, userId: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}ReturnPurchase?itemId=${itemId}&userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.status === 200 && data.success) {
        Swal.fire("You successfully returned this purchase.");
        await this.sharedService.GetUserInfoByUsername(localStorage.getItem("Login")!);
      } else if (response.status === 400 && data.reason === "time_expired") {
        Swal.fire("You cannot return this purchase as 3 days have passed since the purchase date.");
      } else if (response.status === 404 && data.reason === "not_found") {
        Swal.fire("The purchase record was not found. Please try again later.");
      } else {
        Swal.fire("Something went wrong, try again later.");
      }
    } catch (error) {
      console.error("Error in returnPurchaseAsync:", error);
      Swal.fire("Something went wrong, try again later.");
    }
  }
}
