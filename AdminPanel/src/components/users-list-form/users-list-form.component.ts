import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {GettingDataService} from "../../services/getting-data.service";
import {ManipulatingDataService} from "../../services/manipulating-data.service";
import {FilteringDataService} from "../../services/filtering-data.service";
import {NavigationExtras, Router} from "@angular/router";
import Swal from "sweetalert2";
import {DatePipe, Location, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {NavbarFormComponent} from "../navbar-form/navbar-form.component";
import {ScrollToTopFormComponent} from "../scroll-to-top-form/scroll-to-top-form.component";
import {FooterFormComponent} from "../footer-form/footer-form.component";
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";

@Component({
  selector: 'app-users-list-form',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgxPaginationModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    NavbarFormComponent,
    ScrollToTopFormComponent,
    FooterFormComponent,
    DatePipe,
    ThemeToggleComponent
  ],
  templateUrl: './users-list-form.component.html',
  styleUrl: './users-list-form.component.css'
})
export class UsersListFormComponent implements OnInit{
  public users: User[] = [];
  public flag: boolean = false;
  public searchText: string = '';
  public p: number = 1;
  public paginationId: string = 'unique-pagination-id';
  public url: string = "https://localhost:7176";

  constructor(private gettingDataService: GettingDataService, private manipulatingDataService: ManipulatingDataService,
              private filteringDataService: FilteringDataService, private router: Router, private location: Location) {}

  public async GetUsersAsync(): Promise<void> {
    this.users = await this.gettingDataService.GetUsersAsync("All");
    if (this.users.length === 0) {
      this.flag = true;
    }
  }

  private async deleteUser(userId: number, username: string, userMail: string): Promise<void>{
    await this.manipulatingDataService.deleteUserAsync(userId, username, userMail);
    this.users = this.users.filter((user) => user.id !== userId);
  }

  private async banUser(userId: number): Promise<void>{
    await this.manipulatingDataService.banUserAsync(userId);
  }

  public confirmDelete(userId: number, userName: string, userMail: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the user "${userName}"`,
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        await this.deleteUser(userId, userName, userMail);
        Swal.fire(
          'Deleted',
          `You deleted "${userName}" user`,
          'info'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your user is safe :)',
          'info'
        );
      }
    });
  }


  public confirmBan(userId: number, userName: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to ban the user "${userName}"`,
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes, ban it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        await this.banUser(userId);
        Swal.fire(
          'Deleted',
          `You banned "${userName}" user`,
          'info'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your user is safe :)',
          'info'
        );
      }
    });
  }

  public messageUser(username: string): void {
    const navigationExtras: NavigationExtras = {
      queryParams: { 'username': username }
    };
    this.router.navigate(['/app/send-message'], navigationExtras);
  }

  public filterUsers(): User[] {
    return this.filteringDataService.filterUsers(this.users, this.searchText);
  }

  public backOptions(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.GetUsersAsync();
  }
}
