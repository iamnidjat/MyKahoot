import {Component, OnInit} from '@angular/core';
import {QuizModel} from "../QuizModel";

@Component({
  selector: 'app-stats-form',
  templateUrl: './stats-form.component.html',
  styleUrls: ['./stats-form.component.css']
})
export class StatsFormComponent implements OnInit{
  public info: QuizModel[] = [new QuizModel("math", 20, 2)];

  constructor() {
  }

  ngOnInit(): void {
  }
}
