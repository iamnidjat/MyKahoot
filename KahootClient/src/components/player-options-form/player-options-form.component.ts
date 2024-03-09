import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookiesService} from "../../services/cookies.service";
import {ConfigService} from "../../services/config.service";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-player-options-form',
  templateUrl: './player-options-form.component.html',
  styleUrls: ['./player-options-form.component.css']
})
export class PlayerOptionsFormComponent implements OnInit{
  public role: string = "";

  constructor(private router: Router, private el: ElementRef,
              private cookiesService: CookiesService, private configService: ConfigService,
              private sharedService: SharedService) {}

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

  ngOnInit(): void {
    this.role = localStorage.getItem('Role') === JSON.stringify("Teacher") ? 'Teacher' : 'Student';

    const storedUsername: string = localStorage.getItem("Login")!;
    if (storedUsername && this.cookiesService.checkCookie("username") === storedUsername) {
      this.hideCookieWrapper();
    }
  }
}
