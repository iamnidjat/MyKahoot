import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-player-survey-choosing-form',
  templateUrl: './player-survey-choosing-form.component.html',
  styleUrls: ['./player-survey-choosing-form.component.css']
})

export class PlayerSurveyChoosingFormComponent {
  @ViewChild('MixedTest') nameKey!: ElementRef;
  @ViewChild('Programming') nameKey2!: ElementRef;
  @ViewChild('Math') nameKey3!: ElementRef;
  @ViewChild('Logics') nameKey4!: ElementRef;
  constructor(private router: Router) {
    localStorage.removeItem("Programming");
    localStorage.removeItem("Math");
    localStorage.removeItem("Logics");
    localStorage.removeItem("MixedTest");
  }
  public BackOptions(): void{
    if (localStorage.getItem("Guest") !== null)
    {
      this.router.navigate(['/app/auth-form']);
      localStorage.removeItem("Guest");
    }
    else
    {
      this.router.navigate(['/app/player-options-form']);
    }
  }

  public ToRulesForm(elemRef: any): void{
    let element = elemRef;

    let elementId = element.id;

    switch (elementId)
    {
      case "mixed-test":
        localStorage.setItem("MixedTest",this.nameKey.nativeElement.innerText);
        break;
      case "programming":
        localStorage.setItem("Programming",this.nameKey2.nativeElement.innerText);
        break;
      case "math":
        localStorage.setItem("Math",this.nameKey3.nativeElement.innerText);
        break;
      case "logics":
        localStorage.setItem("Logics",this.nameKey4.nativeElement.innerText);
        break;
    }

    this.router.navigate([`/app/rules-form`]);
  }
}
