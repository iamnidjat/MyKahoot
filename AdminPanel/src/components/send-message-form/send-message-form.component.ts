import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Message} from "../../models/Message";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/User";
import {GettingDataService} from "../../services/getting-data.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

const API_URL: string = "https://localhost:7176/api/v1/Message/";

@Component({
  selector: 'app-send-message-form',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './send-message-form.component.html',
  styleUrls: ['./send-message-form.component.css']
})
export class SendMessageFormComponent implements OnInit{
  public receiver: string = "";
  public users: User[] = [];
  @ViewChild("Title") Title!: ElementRef;
  @ViewChild("Body") Body!: ElementRef;
  constructor(private route: ActivatedRoute, private gettingDataService: GettingDataService) {}
  public async sendMessageAsync(title: string, body: string): Promise<void> {
    if (!this.receiver) {
      alert("Please select a recipient.");
      return;
    }

    let message: Message = {
      body: body, title: title, createdDate: new Date(), receiver: this.receiver, sender: localStorage.getItem("Login")!
    }

    await fetch(API_URL + "SendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })

    alert("Your message was sent!");
    this.Title.nativeElement.value = "";
    this.Body.nativeElement.value = "";
  }
  public async sendMessageToEmailAsync(email: string, title: string, body: string): Promise<void> {
    await fetch(API_URL + `SendMessage?email=${email}&title=${title}&body=${body}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    })
  }

  public async GetUsersAsync(): Promise<void> {
    this.users = await this.gettingDataService.GetUsersAsync("All");
  }

  ngOnInit(): void {
    this.GetUsersAsync();
  }
}
