import {Component} from '@angular/core';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class ServiceComponent{
  questions: any[] = [];
  constructor(private http: HttpClient) { }

  getQuestionJson(): Observable<any> | null{
    if (localStorage.getItem("TMixedTest") !== null)
    {
    //  this.MixQuestions();
      return this.http.get<any>("assets/questions/mixedtestquestions.json");
    }
    if (localStorage.getItem("TProgramming") !== null)
    {
      return this.http.get<any>("assets/questions/programming1questions.json");
    }
    if (localStorage.getItem("TMath") !== null)
    {
      return this.http.get<any>("assets/questions/math1questions.json");
    }
    if (localStorage.getItem("TLogics") !== null)
    {
      return this.http.get<any>("assets/questions/logic1questions.json");
    }

    return null;
  }
}
