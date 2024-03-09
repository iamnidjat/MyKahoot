import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL: string = "https://localhost:7176/api/v1/DownloadQuiz/";

@Injectable({
  providedIn: 'root'
})
export class DownloadQuizService {
  constructor(private http: HttpClient) { }

  public downloadDocument(quizContent: string, fileName: string): Observable<Blob> {
    const url: string = API_URL + 'downloadAsDocx';
    const body = { quizContent: quizContent, fileName: fileName };

    return this.http.post(url, body, { responseType: 'blob' });
  }

  public downloadTxt(quizContent: string, fileName: string): Observable<Blob> {
    const url: string = API_URL + 'downloadAsTxt';
    const body = { quizContent: quizContent, fileName: fileName };

    return this.http.post(url, body, { responseType: 'blob' });
  }

  public downloadJson(quizContent: string, fileName: string): Observable<Blob> {
    const url: string = API_URL + 'downloadAsJson';
    const body = { quizContent: quizContent, fileName: fileName };

    return this.http.post(url, body, { responseType: 'blob' });
  }
}
