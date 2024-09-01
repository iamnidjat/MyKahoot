import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
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
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  public creatingTestProcessFlag: boolean = false;

  public closeModal(): void {
    this.close.emit();
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
        Swal.fire('Info', `Your generated code for this private quiz is: ${localStorage.getItem("GeneratedCode")}.\nYou can find it in 'Your Quizzes' section.`, 'info');
        break;
    }

    this.closeModal();
    this.creatingTestProcessFlag = true;
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
