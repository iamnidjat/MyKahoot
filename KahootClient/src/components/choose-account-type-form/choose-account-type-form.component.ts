import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-choose-account-type-form',
  templateUrl: './choose-account-type-form.component.html',
  styleUrls: ['./choose-account-type-form.component.css']
})
export class ChooseAccountTypeFormComponent implements OnInit{
  constructor(private el: ElementRef, private router: Router,
              private sharedService: SharedService) {}

  private capitalizeFirstLetter(input: string): string {
    if (!input) return input;
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  public toRegisterProcess(elemRef: any): void {
    if (localStorage.getItem("SocialUserFlag") !== null) {
      localStorage.setItem("Role", this.capitalizeFirstLetter(elemRef.id));
      alert(localStorage.getItem("Role"))
      this.sharedService.RegisterSocialUser();
      this.router.navigate(['/app/player-options-form']);
    }
    else
    {
      localStorage.setItem("Role", this.capitalizeFirstLetter(elemRef.id));
      this.router.navigate(['/app/register-form']);
    }
    localStorage.removeItem("SocialUserFlag"); // Don't need anymore
  }

  public toLoginForm(): void {
    this.router.navigate(['/app/auth-form']);
  }

  ngOnInit(): void {
    localStorage.removeItem("Role");
  }
}
