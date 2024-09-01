import {Component, ElementRef, ViewChild} from '@angular/core';
import { MykahootStoreManagerService } from "../../services/mykahoot-store-manager.service";
import { FooterFormComponent } from "../footer-form/footer-form.component";
import { NavbarFormComponent } from "../navbar-form/navbar-form.component";
import {Location, NgForOf} from "@angular/common";
import { ScrollToTopFormComponent } from "../scroll-to-top-form/scroll-to-top-form.component";
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle.component";
import { FormsModule } from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-add-item-to-store-form',
  standalone: true,
  imports: [
    FooterFormComponent,
    NavbarFormComponent,
    NgForOf,
    ScrollToTopFormComponent,
    ThemeToggleComponent,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './add-item-to-store-form.component.html',
  styleUrls: ['./add-item-to-store-form.component.css']
})
export class AddItemToStoreFormComponent {
  @ViewChild("photoInput") PhotoInput!: ElementRef;
  public name: string = '';
  public description: string = '';
  public price: number = 0;
  public quantity: number = 0;
  public photoFile: File | null = null;

  constructor(private myKahootStoreManager: MykahootStoreManagerService, private location: Location) {}

  public onPhotoFileSelected(event: any) {
    this.photoFile = event.target.files[0];
  }

  public async addItemAsync(): Promise<void> {
      if (this.name != '' && this.description != '' && this.price > 0 && this.quantity > 0) {
        await this.myKahootStoreManager.addItemAsync(this.name, this.description, this.price, this.quantity, this.photoFile);

        this.name = '';
        this.description = '';
        this.price = 0;
        this.quantity = 0;
        this.photoFile = null;
        this.PhotoInput.nativeElement.value = '';
      }
      else {
        alert("Fill in all fields.");
      }
    }

  public backOptions(): void {
    this.location.back();
  }
}
