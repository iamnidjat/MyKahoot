import {Component, ElementRef, Input} from '@angular/core';
import {Router} from "@angular/router";
import {CreatingQuizOptionFormComponent} from "../creating-quiz-option-form/creating-quiz-option-form.component";
import Swal from "sweetalert2";

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

@Component({
  selector: 'app-public-private-type-popup-form',
  templateUrl: './public-private-type-popup-form.component.html',
  styleUrls: ['./public-private-type-popup-form.component.css']
})
export class PublicPrivateTypePopupFormComponent {
  @Input() public creatingTestProcessFlag: boolean = false;

  constructor(private el: ElementRef, private router: Router,
              private childComponent: CreatingQuizOptionFormComponent) {}

  public ClosePopUp(): void{
    let modal = this.el.nativeElement.querySelector(".modal");

    modal.style.display = "none";

    this.childComponent.flagOfCustomCategory = false;
    this.childComponent.flagOfExistingCategory = false;
  }

  public async ToCreatingTestProcess(format: any): Promise<void>{
    switch (format.id)
    {
      case "public":
        localStorage.setItem("Private", "");
        localStorage.setItem("GeneratedCode", "-");
        break;
      case "private":
        localStorage.setItem("Private", "true");
        await this.GenerateCode();
        Swal.fire('Info', `Your generated code for this private quiz is: ${localStorage.getItem("GeneratedCode")}.\nYou can find it 'Your Quizzes' section.`, 'info');
        break;
    }

    this.router.navigate(['app/creating-test-form']);

    let modal = this.el.nativeElement.querySelector(".modal");

    modal.style.display = "none";
  }

  private async GenerateCode(): Promise<void> {
    try {
      const response = await fetch(API_URL + "GenerateCode", {
        method: "GET"
      });
      const data = await response.text();
      localStorage.setItem("GeneratedCode", data);
    } catch (error) {
      console.error("Error fetching or setting data:", error);
    }
  }
}
