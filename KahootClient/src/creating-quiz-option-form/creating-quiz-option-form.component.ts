import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-creating-quiz-option-form',
  templateUrl: './creating-quiz-option-form.component.html',
  styleUrls: ['./creating-quiz-option-form.component.css']
})

export class CreatingQuizOptionFormComponent {
  @ViewChild('MixedTest') nameKey!: ElementRef;
  @ViewChild('Programming') nameKey2!: ElementRef;
  @ViewChild('Math') nameKey3!: ElementRef;
  @ViewChild('Logics') nameKey4!: ElementRef;
  flag: boolean = false;

  constructor(private router: Router) {
    localStorage.removeItem("ProgrammingC");
    localStorage.removeItem("MathC");
    localStorage.removeItem("LogicsC");
    localStorage.removeItem("MixedTestC");

  }
  public BackOptions(): void{
      this.router.navigate(['/app/player-options-form']);
  }

  public ToCreatingQuizForm(elemRef: any): void{
    let element = elemRef;

    let elementId = element.id;

    switch (elementId)
    {
      case "mixed-test":
        localStorage.setItem("MixedTestC",this.nameKey.nativeElement.innerText);
        break;
      case "programming":
        localStorage.setItem("ProgrammingC",this.nameKey2.nativeElement.innerText);
        break;
      case "math":
        localStorage.setItem("MathC",this.nameKey3.nativeElement.innerText);
        break;
      case "logics":
        localStorage.setItem("LogicsC",this.nameKey4.nativeElement.innerText);
        break;
    }

    this.router.navigate([`/app/creating-test-form`]);
  }

  OpenModalWindow(): any{
    this.flag = true;
  }
}
