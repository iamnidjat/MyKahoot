import {Component, EventEmitter, Input, Output} from '@angular/core';
import Swal from "sweetalert2";
import {DeletedAcc} from "../../models/DeletedAcc";
import {Router} from "@angular/router";
import {DeleteAccFormComponent} from "../delete-acc-form/delete-acc-form.component";

const API_URL: string = "https://localhost:7176/api/v1/Account/";

@Component({
  selector: 'app-delete-acc-popup-form',
  templateUrl: './delete-acc-popup-form.component.html',
  styleUrls: ['./delete-acc-popup-form.component.css']
})

export class DeleteAccPopupFormComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Input() reason: string = "";

  constructor(private router: Router) {}

  public Cancel(): void{
    this.close.emit();
  }

  public async DeleteAcc(e: any): Promise<void>{
    e.preventDefault();

    let deletedAcc: DeletedAcc = {userName: localStorage.getItem('Login')!,
      email: localStorage.getItem('userMail')!, reason: this.reason}
    {
      await fetch(API_URL + `DeleteAcc?userId=${parseInt(localStorage.getItem('userId')!)}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(deletedAcc)
      }).then((response) => {
        Swal.fire("Your account was deleted!");
        localStorage.clear();
        this.router.navigate(['/app/auth-form']);
      });
    }
  }
}
