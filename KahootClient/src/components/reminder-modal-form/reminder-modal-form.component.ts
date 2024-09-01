import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {Reminder} from "../../models/Reminder";
import Swal from "sweetalert2";

const API_URL: string = "https://localhost:7176/api/v1/Reminder/";
@Component({
  selector: 'app-reminder-modal-form',
  templateUrl: './reminder-modal-form.component.html',
  styleUrls: ['./reminder-modal-form.component.css']
})
export class ReminderModalFormComponent {
  @Input() public reminderName: string = "";
  @Input() public catName: string = "";
  @Input() public testMode: string = "";
  @Output() public close: EventEmitter<void> = new EventEmitter<void>();
  public reminderDate: Date | null = null;
  constructor(private el: ElementRef) {}

  public ClosePopUp(): void{
    let modal = this.el.nativeElement.querySelector(".modal");
    modal.style.display = "none";
    this.close.emit();
  }

  public async createReminder(): Promise<void> {
    if (this.reminderDate && new Date(this.reminderDate).getTime() > Date.now()) {
      let reminder: Reminder = {
        name: this.reminderName,
        catName: this.catName,
        testMode: this.testMode,
        whenToPass: this.reminderDate,
        userId: parseInt(localStorage.getItem("userId")!)
      };

      console.log(reminder);

      await fetch(API_URL + "SetReminder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reminder)
      }).then((result) => {
        if (result.status === 200) {
          Swal.fire("Congratulations! You successfully set a reminder!");
          this.ClosePopUp();
        }
      });
    } else {
      Swal.fire("Please select a date for the reminder.");
    }
  }
}
