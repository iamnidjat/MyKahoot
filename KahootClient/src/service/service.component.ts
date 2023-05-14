import {Component} from '@angular/core';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

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

  getQuestionJson(){
    if (localStorage.getItem("MixedTest") !== null)
    {
      this.MixQuestions();
      return this.http.get<any>("assets/questions/mixedtestquestions.json");
    }
    if (localStorage.getItem("Programming") !== null)
    {
      return this.http.get<any>("assets/questions/programming1questions.json");
    }
    if (localStorage.getItem("Math") !== null)
    {
      return this.http.get<any>("assets/questions/math1questions.json");
    }
    if (localStorage.getItem("Logics") !== null)
    {
      return this.http.get<any>("assets/questions/logic1questions.json");
    }

    return null;
  }

  MixQuestions(): any{
    this.questions.push(this.http.get<any>("assets/questions/programming1questions.json"),
      this.http.get<any>("assets/questions/math1questions.json"),
      this.http.get<any>("assets/questions/logic1questions.json"));

    this.Shuffle(this.questions);
  }

  Shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  };
}
