import { Component } from '@angular/core';
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

export class ServiceComponent {
  constructor(private http : HttpClient) { }

  getQuestionJson(){
    return this.http.get<any>("assets/questions/programming1questions.json");
  }
}
