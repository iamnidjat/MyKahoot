import { Injectable } from '@angular/core';
import {CreatedQuiz} from "../models/CreatedQuiz";

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

@Injectable({
  providedIn: 'root'
})
export class DownloadCategoriesSharedService{
  public downloadCategories(categories: CreatedQuiz[]): void{
    fetch(API_URL + "DownloadCategory", {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      Object.keys(data).forEach((key) =>
      {
        if (!['Mixed Test', 'Programming', 'Math', 'Logics'].includes(data[key]['categoryName'])) {
          categories.push(data[key]);
        }
      });
    })
  }
}
