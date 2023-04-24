import {Component, OnInit} from '@angular/core';
import {QuizModel} from "../QuizModel";

@Component({
  selector: 'app-stats-and-top10-results-form',
  templateUrl: './stats-and-top10-results-form.component.html',
  styleUrls: ['./stats-and-top10-results-form.component.css']
})

export class StatsAndTop10ResultsFormComponent implements OnInit{
  public info: QuizModel[] = [new QuizModel("me", 20, "math")];

  constructor() {

  }

  ngOnInit(): void {
  }

}
