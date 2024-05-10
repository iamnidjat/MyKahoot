import {Component, ElementRef, ViewChild} from '@angular/core';
import {AvailableTestsListsFormComponent} from "../available-tests-lists-form/available-tests-lists-form.component";
import Swal from "sweetalert2";
import {CheckDataService} from "../../services/check-data.service";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-enter-private-test-code-popup-form',
  templateUrl: './enter-private-test-code-popup-form.component.html',
  styleUrls: ['./enter-private-test-code-popup-form.component.css']
})
export class EnterPrivateTestCodePopupFormComponent {
  @ViewChild("Code") Code!: ElementRef;
  public codesMatch: boolean = true;

  constructor(private el: ElementRef, private flag: AvailableTestsListsFormComponent,
              private checkService: CheckDataService, private router: Router) {}

  public ClosePopUp(): void{
    let modal = this.el.nativeElement.querySelector(".modal");

    modal.style.display = "none";

    localStorage.removeItem("MyCategory"); // Don't need anymore
    localStorage.removeItem("testFormat"); // Don't need anymore
    localStorage.removeItem("MyTestName"); // Don't need anymore
    this.flag.flagForCodeChecking = false;
  }

  public async CheckCode(): Promise<void> {
    if (this.Code.nativeElement.value != "")
    {
      if (!await this.checkService.CheckCode(localStorage.getItem("categoryName")!,
        localStorage.getItem("TestName")!, this.Code.nativeElement.value)) {
        this.codesMatch = false;
      }
      else {
        if (localStorage.getItem("action") === "play") {
          const navigationExtras: NavigationExtras = {
            queryParams: { 'action': 'play',
              'form': 'private',
              'categoryName': localStorage.getItem("categoryName"),
              'testName': localStorage.getItem("TestName")}
          };
          await this.router.navigate([`/app/choose-level-form`], navigationExtras);
        }
        else {
          localStorage.setItem("surveyGuard", "guard");
          const navigationExtras: NavigationExtras = {
            queryParams: { 'action': 'watch',
              'form': 'private',
              'categoryName': localStorage.getItem("categoryName"),
              'testName': localStorage.getItem("TestName")}
          };
          await this.router.navigate([`/app/rules-form`], navigationExtras);
        }

        let modal = this.el.nativeElement.querySelector(".modal");

        modal.style.display = "none";

        localStorage.removeItem("CodesMatch"); // Don't need anymore
      }
    }
    else
    {
      Swal.fire('Oops', 'Incorrect data!', 'error');
    }
  }
}
