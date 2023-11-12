import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-rules-form',
  templateUrl: './rules-form.component.html',
  styleUrls: ['./rules-form.component.css']
})
export class RulesFormComponent implements OnInit{
  public level: string = "";

  constructor(private router: Router) {
    localStorage.removeItem("ruleGuard");
  }

  ToTheQuiz(): void{
    localStorage.setItem("ruleGuard", "guard2");
    this.router.navigate(['/app/test-process-form']);
  }

  ToChoosing(): void{
    this.router.navigate(['/app/player-survey-choosing-form']);
  }

  ngOnInit(): void {
    this.level = localStorage.getItem("Level")!;
  }
}
