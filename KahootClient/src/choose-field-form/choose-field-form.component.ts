import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-choose-field-form',
  templateUrl: './choose-field-form.component.html',
  styleUrls: ['./choose-field-form.component.css']
})
export class ChooseFieldFormComponent {
  @ViewChild('MixedTest') nameKey!: ElementRef;
  @ViewChild('Programming') nameKey2!: ElementRef;
  @ViewChild('Math') nameKey3!: ElementRef;
  @ViewChild('Logics') nameKey4!: ElementRef;
  constructor(private router: Router) {
    localStorage.removeItem("ProgrammingS");
    localStorage.removeItem("MathS");
    localStorage.removeItem("LogicsS");
    localStorage.removeItem("MixedTestS");
  }
  public BackOptions(): void{
      this.router.navigate(['/app/player-options-form']);
  }

  public ToTop10StatsForm(elemRef: any): void{
    let element = elemRef;

    let elementId = element.id;

    switch (elementId)
    {
      case "mixed-test":
        localStorage.setItem("MixedTestS",this.nameKey.nativeElement.innerText);
        break;
      case "programming":
        localStorage.setItem("ProgrammingS",this.nameKey2.nativeElement.innerText);
        break;
      case "math":
        localStorage.setItem("MathS",this.nameKey3.nativeElement.innerText);
        break;
      case "logics":
        localStorage.setItem("LogicsS",this.nameKey4.nativeElement.innerText);
        break;
    }

    this.router.navigate([`/app/top10-form`]);
  }
}
