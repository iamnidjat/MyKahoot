import {Component, OnInit} from '@angular/core';
import {ItemToBuy} from "../../models/ItemToBuy";
import {MykahootstoreService} from "../../services/mykahootstore.service";

@Component({
  selector: 'app-my-items-form',
  templateUrl: './my-items-form.component.html',
  styleUrls: ['./my-items-form.component.css']
})
export class MyItemsFormComponent implements OnInit{
  public userItems: ItemToBuy[] = [];
  public api: string = "https://localhost:7176";
  constructor(private myKahootService: MykahootstoreService) {}

  public async getUserItemsAsync(): Promise<void> {
    await this.myKahootService.getUserItemsAsync(parseInt(localStorage.getItem("userId")!), this.userItems);
  }

  public async returnPurchaseAsync(itemId: number): Promise<void> {
    await this.myKahootService.returnPurchaseAsync(itemId, parseInt(localStorage.getItem("userId")!));
  }

  ngOnInit(): void {
    this.getUserItemsAsync();
  }
}
