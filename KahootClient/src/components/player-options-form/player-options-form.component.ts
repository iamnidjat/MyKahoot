import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookiesService} from "../../services/cookies.service";
import {ConfigService} from "../../services/config.service";
import {SharedService} from "../../services/shared.service";
import {ReminderService} from "../../services/reminder.service";
import Swal from "sweetalert2";
import {UserStateService} from "../../services/user-state.service";

@Component({
  selector: 'app-player-options-form',
  templateUrl: './player-options-form.component.html',
  styleUrls: ['./player-options-form.component.css']
})
export class PlayerOptionsFormComponent implements OnInit{
  public role: string = "";
  public isDisabled: boolean = false;

  constructor(private router: Router, private el: ElementRef,
              private cookiesService: CookiesService, private configService: ConfigService,
              private sharedService: SharedService, private reminderService: ReminderService,
              private userStateService: UserStateService) {}

  public backAuth(e: any): void{
    this.sharedService.backAuth(e);
  }

  public onSubjectsClick(): void{
    this.router.navigate(['/app/player-survey-choosing-form']);
  }

  public onCreateQuizClick(): void{
    this.router.navigate(['/app/creating-quiz-option-form']);
  }

  public onProfileClick(): void{
    this.router.navigate(['/app/profile-form']);
  }

  public onReadMoreClick(): void{
    window.open(this.configService.cookiesConsentUrl, "_blank");
  }

  public onStoreClick(): void{
    this.router.navigate(['/app/mykahoot-store']);
  }

  public acceptCookiesClick(): void {
    this.cookiesService.setCookie("username", localStorage.getItem("Login")!, 365);

    this.hideCookieWrapper();
  }

  public declineCookiesClick(): void {
    this.cookiesService.setCookie("username", localStorage.getItem("Login")!, 0);

    this.hideCookieWrapper();
  }

  private hideCookieWrapper(): void {
    const wrapper = this.el.nativeElement.querySelector(".wrapper");
    wrapper.style.display = "none";
  }

  async ngOnInit(): Promise<void> {
    this.checkCookies();

    setTimeout(async () => {
      this.role = localStorage.getItem('Role')!;
      const userReminder = await this.reminderService.doesUserHaveReminderAsync();
      if (userReminder) {
        Swal.fire("You have a reminder to pass a quiz! Please go to your profile dashboard to see the reminder!");
      }

      const isBannedChecked: string | null = sessionStorage.getItem('IsBannedChecked');

      if (!isBannedChecked) {
        const response = await this.userStateService.isUserBannedAsync();
        if (response) this.isDisabled = true;

        // Mark the code as executed
        sessionStorage.setItem('IsBannedChecked', 'true');
      }
    }, 200);

    localStorage.removeItem("Level");
    localStorage.removeItem("QuizCreator");
    localStorage.removeItem("TestName");
    localStorage.removeItem("categoryName");
    localStorage.removeItem("action");
    localStorage.removeItem("GeneratedCode");
    localStorage.removeItem("CategoryType")
  }

  private checkCookies(): void {
    const storedUsername: string = localStorage.getItem("Login")!;
    if (storedUsername && this.cookiesService.checkCookie("username") === storedUsername) {
      this.hideCookieWrapper();
    }
  }
}
