import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Message} from "../../models/Message";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/User";
import {GettingDataService} from "../../services/getting-data.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {FooterFormComponent} from "../footer-form/footer-form.component";
import {ScrollToTopFormComponent} from "../scroll-to-top-form/scroll-to-top-form.component";
import {NavbarFormComponent} from "../navbar-form/navbar-form.component";
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";
import {Location} from "@angular/common";

const API_URL: string = "https://localhost:7176/api/v1/Message/";
const API_URL2: string = "https://localhost:7176/api/v1/Admin/";

@Component({
  selector: 'app-send-message-form',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    TranslateModule,
    FooterFormComponent,
    ScrollToTopFormComponent,
    NavbarFormComponent,
    ThemeToggleComponent
  ],
  templateUrl: './send-message-form.component.html',
  styleUrls: ['./send-message-form.component.css']
})
export class SendMessageFormComponent implements OnInit{
  public receiver: string = "";
  public users: User[] = [];
  public filteredUsers: User[] = [];
  public searchTerm: string = ''; // For the search input
  public selectedUser: any = null; // Selected user object
  public selectedEmail: string = ''; // Selected email option
  public title: string = '';
  public body: string = '';
  constructor(private location: Location, private route: ActivatedRoute, private gettingDataService: GettingDataService) {}

  public filterUsers(): void {
    this.selectedUser = null;
    this.filteredUsers = this.users.filter(user =>
      user.username!.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  public selectUser(user: User): void {
    this.selectedUser = user;
    this.receiver = user.username!;
    this.searchTerm = user.username!; // Update input field with selected user's username
    this.filteredUsers = []; // Hide the dropdown after selection
  }
  public async sendMessageAsync(): Promise<void> {
    if (!this.receiver || !this.body || !this.title ) {
      alert("Please fill in all fields.");
      return;
    }

    let message: Message = {
      body: this.body, title: this.title, createdDate: new Date(), receiver: this.receiver, sender: "admin"
    }

    await fetch(API_URL + "SendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })

    if (this.selectedEmail)
    {
      await this.sendMessageToEmailAsync(this.selectedEmail, this.title, this.body);
    }

    // Optionally reset form fields
    this.selectedUser = null;
    this.selectedEmail = '';
    this.title = '';
    this.body = '';
    alert("Your message was sent!");
  }
  public async sendMessageToEmailAsync(email: string, title: string, body: string): Promise<void> {
    await fetch(API_URL2 + `SendMessageToEmail?email=${email}&title=${title}&body=${body}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    })
  }

  public async GetUsersAsync(): Promise<void> {
    this.users = await this.gettingDataService.GetUsersAsync("All");
    if (this.receiver) {
      this.selectedUser = this.users.find(user => user.username === this.receiver) || null;
      this.searchTerm = this.selectedUser.username;
    }
  }

  public backOptions(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.receiver = params['username'] || '';
    });
    this.GetUsersAsync();
  }
}
