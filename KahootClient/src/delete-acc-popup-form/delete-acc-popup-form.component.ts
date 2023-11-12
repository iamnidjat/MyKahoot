import { Component } from '@angular/core';
import Swal from "sweetalert2";
import {DeletedAcc} from "../DeletedAcc";
import {Router} from "@angular/router";
import {DeleteAccFormComponent} from "../delete-acc-form/delete-acc-form.component";

@Component({
  selector: 'app-delete-acc-popup-form',
  templateUrl: './delete-acc-popup-form.component.html',
  styleUrls: ['./delete-acc-popup-form.component.css']
})

export class DeleteAccPopupFormComponent {
  private url: string = "https://localhost:7176/api/v1/Account/";

  constructor(private router: Router, private flag: DeleteAccFormComponent, private reason: DeleteAccFormComponent) {
  }

  Cancel(): void{
    this.flag.flag = false;
  }

  public async DeleteAcc(e: any): Promise<void>{
    e.preventDefault();

    let deletedAcc: DeletedAcc = new DeletedAcc(localStorage.getItem('Login')! || localStorage.getItem('newLogin')!, localStorage.getItem('userMail')!, this.reason.reason);
    {
      await fetch(this.url + `DeleteAcc?userId=${parseInt(localStorage.getItem('userId')!)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(deletedAcc)
      }).then((response) => {
        Swal.fire("Your account was deleted!");
        this.router.navigate(['/app/auth-form']);
      });
    }
  }
}
