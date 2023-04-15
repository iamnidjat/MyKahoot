import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-rules-form',
  templateUrl: './rules-form.component.html',
  styleUrls: ['./rules-form.component.css']
})
export class RulesFormComponent{
  // //@ViewChild('name') nameKey!: ElementRef;
  constructor(private router: Router) { }
  ToTheQuiz(): void{
    this.router.navigate(['/app/test-process-form']);
  }
}
