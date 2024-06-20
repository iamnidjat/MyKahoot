import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../models/Message";
import {Router} from "@angular/router";

const API_URL: string = "https://localhost:7176/api/v1/Message/";

@Component({
  selector: 'app-get-messages-form',
  templateUrl: './get-messages-form.component.html',
  styleUrls: ['./get-messages-form.component.css']
})
export class GetMessagesFormComponent implements OnInit{
  public messages: Message[] = [];
  public searchText: string = "";
  @Input() public openMessageFlag: boolean = false;
  public selectedMessage: Message | null = null;

  constructor(private router: Router) {}

  public async getMessagesAsync(): Promise<void> {
    const response = await fetch(API_URL + `GetMessages?userName=${localStorage.getItem("Login")}`);
    const data = await response.json();
    this.messages = data.map((item: any) => ({
      id: item.id,
      title: item.title,
      body: item.body,
      createdDate: new Date(item.createdDate),
      sender: item.sender,
      receiver: item.receiver
    }));
  }

  public async getMessageAsync(messageId: number): Promise<void> {
    const response = await fetch(API_URL + `GetMessage?messageId=${messageId}`);
    const data = await response.json();
    this.selectedMessage = {
      id: data.id,
      title: data.title,
      body: data.body,
      createdDate: new Date(data.createdDate),
      sender: data.sender,
      receiver: data.receiver
    };
    this.openMessageFlag = true;
  }

  public filterMessages(): Message[] {
    return this.messages.filter(message =>
      message.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  public backOptions(): void {
      this.router.navigate(['/app/my-profile-form']);
  }

  public openMessage(messageId: number): void {
    this.getMessageAsync(messageId);
  }

  ngOnInit(): void {
    this.getMessagesAsync();
  }
}
