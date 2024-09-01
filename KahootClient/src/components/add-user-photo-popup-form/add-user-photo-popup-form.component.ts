import { Component, Input, EventEmitter, Output } from '@angular/core';

const API_URL: string = "https://localhost:7176/api/v1/Account/";
const API_URL2: string = "https://localhost:7176/api/v1/UserInfo/";

@Component({
  selector: 'app-add-user-photo-popup-form',
  templateUrl: './add-user-photo-popup-form.component.html',
  styleUrls: ['./add-user-photo-popup-form.component.css']
})
export class AddUserPhotoPopupFormComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  public photoFile: File | null = null;

  public closeModal(): void {
    this.close.emit();
  }

  public onPhotoFileSelected(event: any): void {
    this.photoFile = event.target.files[0];
  }

  public async addUserPhotoAsync(): Promise<void> {
    let formData = new FormData();
    if (this.photoFile) {
      formData.append("photo", this.photoFile);
    }

    await fetch(API_URL + `AddUserPhoto?userId=${parseInt(localStorage.getItem("userId")!)}`, {
      method: "POST",
      body: formData
    });

    await this.getUserPhotoAsync();

    this.closeModal();
  }

  private async getUserPhotoAsync(): Promise<void> {
    try {
      const userId = parseInt(localStorage.getItem("userId")!);

      const response = await fetch(`${API_URL2}GetUserInfo?id=${userId}`, {
        method: "GET",
      });
      const data = await response.json();
      localStorage.setItem("userPhoto", data.photo);

    } catch (error) {
      console.error("An error occurred while fetching user info:", error);
    }
  }
}

