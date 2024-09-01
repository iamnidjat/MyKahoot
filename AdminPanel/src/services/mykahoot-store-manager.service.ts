import { Injectable } from '@angular/core';
import {ItemToBuy} from "../models/ItemToBuy";
import Swal from "sweetalert2";

const API_URL: string = "https://localhost:7176/api/v1/Admin/";
const API_URL2: string = "https://localhost:7176/api/v1/ItemStore/";

@Injectable({
  providedIn: 'root'
})
export class MykahootStoreManagerService {
  public async getAllItemsAsync(items: ItemToBuy[]): Promise<void> {
    await fetch(API_URL2 + `GetAllItems`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("aaa", data);
      Object.keys(data).forEach((key) =>
      {
        items.push(data[key]);
      });
    })
  }

  public async addItemAsync(name: string, description: string, price: number, quantity: number, photoFile: File | null): Promise<void> {
    let formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("quantity", quantity.toString());

    // Append files if they exist
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    await fetch(API_URL + `AddItemToStore`, {
      method: "POST",
      body: formData
    }).then((result) => {
      if (result.status === 200)
      {
        Swal.fire(`You added new item to the store!`);
      }
    });
  }

  public async removeItemAsync(itemId: number): Promise<void> {
    await fetch(API_URL + `RemoveItemFromStore?itemId=${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    }).then((result) => {
      if (result.status === 200)
      {
        Swal.fire(`You removed item from the store!`);
      }
    });
  }

  public async editItemAsync(itemId: number, item: ItemToBuy, photoFile: File | null): Promise<void> {
    let formData = new FormData();
    formData.append("name", item.name);
    formData.append("description", item.description);
    formData.append("price", item.price.toString());
    formData.append("quantity", item.quantity.toString());

    // Append files if they exist
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    try {
      const response =  await fetch(API_URL2 + `EditItem?itemId=${itemId}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (response.status === 200 && data.success) {
        Swal.fire("You updated item.");
      } else if (response.status === 404 && data.reason === "not_found") {
        Swal.fire("The item record was not found. Please try again later.");
      } else {
        Swal.fire("Something went wrong, try again later.");
      }
    } catch (error) {
      console.error("Error in editItemAsync:", error);
      Swal.fire("Something went wrong, try again later.");
    }
  }

  public async disableItemInStoreAsync(itemId: number): Promise<void> {
    await fetch(API_URL2 + `DisableItemInStore?itemId=${itemId}`, {
      method: "PATCH",
    }).then((result) => {
      if (result.status === 200)
      {
        Swal.fire(`You disabled item in the store!`);
      }
    });
  }

  public async enableItemInStoreAsync(itemId: number): Promise<void> {
    await fetch(API_URL2 + `EnableItemInStore?itemId=${itemId}`, {
      method: "PATCH",
    }).then((result) => {
      if (result.status === 200)
      {
        Swal.fire(`You enabled item in the store!`);
      }
    });
  }
}
