import {Component, OnInit} from '@angular/core';
import {ItemToBuy} from "../../models/ItemToBuy";
import {MykahootStoreManagerService} from "../../services/mykahoot-store-manager.service";
import {NavbarFormComponent} from "../navbar-form/navbar-form.component";
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";
import {ScrollToTopFormComponent} from "../scroll-to-top-form/scroll-to-top-form.component";
import {FooterFormComponent} from "../footer-form/footer-form.component";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import { Location } from '@angular/common';
import Swal from "sweetalert2";

@Component({
  selector: 'app-get-items-form',
  standalone: true,
  imports: [
    NavbarFormComponent,
    ThemeToggleComponent,
    ScrollToTopFormComponent,
    FooterFormComponent,
    NgForOf,
    FormsModule,
    NgIf,
    NgOptimizedImage,
    TranslateModule,

  ],
  templateUrl: './get-items-form.component.html',
  styleUrl: './get-items-form.component.css'
})
export class GetItemsFormComponent implements OnInit{
  public items: ItemToBuy[] = [];
  public api: string = "https://localhost:7176";
  private photoFiles: { [key: number]: File | null } = {}; // Track files for each item
  public editMode: { [key: number]: boolean } = {}; // Track edit mode for each item

  constructor(private myKahootStoreManager: MykahootStoreManagerService, private router: Router,
              private location: Location) {}

  public async getAllItemsAsync(): Promise<void> {
    await this.myKahootStoreManager.getAllItemsAsync(this.items);
  }

  public confirmDelete(itemId: number, itemName: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the item "${itemName}"`,
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        await this.removeItemAsync(itemId);
        Swal.fire(
          'Deleted',
          `You deleted the "${itemName}" item`,
          'info'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your item is safe :)',
          'info'
        );
      }
    });
  }

  private async removeItemAsync(itemId: number): Promise<void> {
    await this.myKahootStoreManager.removeItemAsync(itemId);
    this.items = this.items.filter((item) => item.id !== itemId);
  }

  public async saveItemChangesAsync(itemId: number, item: ItemToBuy): Promise<void> {
    // Upload photo if exists
    const photoFile = this.photoFiles[itemId] || null;
    await this.myKahootStoreManager.editItemAsync(itemId, item, photoFile);
    this.editMode[item.id!] = false; // Disable edit mode
  }

  public onFileChange(event: any, itemId: number): void {
    this.photoFiles[itemId] = event.target.files[0];
  }

  public cancelEditMode(itemId: number): void {
    this.editMode[itemId] = !this.editMode[itemId];
    this.photoFiles[itemId] = null; // Clear the file after saving
  }

  public toggleEditMode(itemId: number): void {
    this.editMode[itemId] = !this.editMode[itemId];
  }
  public onAddItemClick(): void {
    this.router.navigate(['/app/add-item-to-store']);
  }

  public async manipulateItemAsync(itemId: number, isDisabled: boolean): Promise<void> {
    if (isDisabled) {
      await this.myKahootStoreManager.enableItemInStoreAsync(itemId);
    }
    else {
      await this.myKahootStoreManager.disableItemInStoreAsync(itemId);
    }
  }


  public backOptions(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getAllItemsAsync();
  }
}
