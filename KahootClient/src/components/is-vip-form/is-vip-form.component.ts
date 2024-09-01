import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-is-vip-form',
  templateUrl: './is-vip-form.component.html',
  styleUrls: ['./is-vip-form.component.css']
})
export class IsVipFormComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(private el: ElementRef, private router: Router, private quizService: QuizService) {}

  public closeModal(): void {
    this.close.emit();
  }

  public async ToCreatingTestProcess(e: any): Promise<void>{
    if (e.target.value === 'VIP') {
      if (await this.quizService.canUserCreateVIPAsync(parseInt(localStorage.getItem("userId")!))) {
        this.closeModal();
        await this.router.navigate(['app/creating-test-form']);
      }
    }
    else {
      this.closeModal();
      await this.router.navigate(['app/creating-test-form']);
    }
  }
}
