import {Component, OnInit} from '@angular/core';
import {GettingDataService} from "../../services/getting-data.service";
import {ManipulatingDataService} from "../../services/manipulating-data.service";
import {FilteringDataService} from "../../services/filtering-data.service";
import Swal from "sweetalert2";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {TranslateModule} from "@ngx-translate/core";
import {User} from "../../models/User";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {NavbarFormComponent} from "../navbar-form/navbar-form.component";
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";
import {ScrollToTopFormComponent} from "../scroll-to-top-form/scroll-to-top-form.component";
import {FooterFormComponent} from "../footer-form/footer-form.component";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [
    TranslateModule,
    NavbarFormComponent,
    ThemeToggleComponent,
    ScrollToTopFormComponent,
    FooterFormComponent
  ],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.css'
})
export class MenuFormComponent implements OnInit{
  constructor(private router: Router, private authService: AuthService) {}

  public onUsersListsClick(): void {
    this.router.navigate(['/app/users-list']);
  }

  public onQuizzesListClick(): void {
    this.router.navigate(['/app/quizzes-list']);
  }

  public onSendNewsClick(): void {
    this.router.navigate(['/app/send-news']);
  }

  public onMessagesClick(): void {
    this.router.navigate(['/app/messages-menu-page']);
  }

  public onMyKahootStoreClick(): void {
    this.router.navigate(['/app/mykahoot-store']);
  }

  public backAuth(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }
}
