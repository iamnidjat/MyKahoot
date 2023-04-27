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
  constructor(private http: HttpClient) { }

  getQuestionJson(){
    if (localStorage.getItem("MixedTest") !== null)
    {

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
}
