import {Component, OnInit} from '@angular/core';
import {MykahootstoreService} from "../../services/mykahootstore.service";
import {ItemToBuy} from "../../models/ItemToBuy";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mykahoot-store-form',
  templateUrl: './mykahoot-store-form.component.html',
  styleUrls: ['./mykahoot-store-form.component.css']
})
export class MykahootStoreFormComponent implements OnInit{
  public items: ItemToBuy[] = [];
  public api: string = "https://localhost:7176";
  public flag: boolean = false;
  public selectedItem: ItemToBuy | null = null;
  constructor(private router: Router, private myKahootService: MykahootstoreService) {}

  public async getAllItemsAsync(): Promise<void> {
    await this.myKahootService.getAllItemsAsync(this.items);
  }

  public async buyAnItemAsync(item: ItemToBuy): Promise<void> {
    this.selectedItem = item;
    this.flag = true;
  }

  public backOptions(): void{
    this.router.navigate(['/app/player-options-form']);
  }

  ngOnInit(): void {
    this.getAllItemsAsync();
  }
}
