import {Component, ElementRef, ViewChild} from '@angular/core';
import {TestProcessComponent} from "../test-process/test-process.component";
import {SendFeedbackService} from "../../services/send-feedback.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-feedback-popup-form',
  templateUrl: './feedback-popup-form.component.html',
  styleUrls: ['./feedback-popup-form.component.css']
})
export class FeedbackPopupFormComponent {
  private feedbackScore: number = 0;
  @ViewChild('Feedback') feedbackComment!: ElementRef;

  constructor(private el: ElementRef, private childComponent: TestProcessComponent,
              private sendFeedbackService: SendFeedbackService) {}

  public giveFeedback(starIndex: number): void {
    for (let i: number = 1; i <= 5; i++) {
      const star = document.getElementById(`star${i}`);
      if (star) {
        if (i <= starIndex) {
          star.classList.add('checked');
        }
        else {
          star.classList.remove('checked');
        }
      }
    }

    this.feedbackScore = starIndex;
  }

  public async SaveQuizFeedback(): Promise<void> { // !
    await this.sendFeedbackService.SaveQuizFeedback(this.childComponent.testType, this.childComponent.quizName,
      this.feedbackScore, this.feedbackComment.nativeElement.value);

    Swal.fire("Thank you for your feedback!");

    let modal = this.el.nativeElement.querySelector(".modal");
    modal.style.display = "none";
  }

  public async ClosePopUp(): Promise<void> {
    await this.sendFeedbackService.SaveQuizFeedback(this.childComponent.testType,
      this.childComponent.quizName, 0, "");

    let modal = this.el.nativeElement.querySelector(".modal");

    modal.style.display = "none";
  }
}
