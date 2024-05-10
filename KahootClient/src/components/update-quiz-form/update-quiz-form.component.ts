import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import { Question } from 'src/models/Question';

@Component({
  selector: 'app-update-quiz-form',
  templateUrl: './update-quiz-form.component.html',
  styleUrls: ['./update-quiz-form.component.css']
})
export class UpdateQuizFormComponent implements OnInit, OnDestroy{
  public name: string = "";
  public testType: string = "";
  public catType: string = "";
  public currentQuestion: number = 0;
  public isQuizCompleted: boolean = false;
  public questions: any = [];
  private url: string = "https://localhost:7176/api/v1/Quiz/";
  @ViewChild('Points') Points!: ElementRef;
  @ViewChild('Time') Time!: ElementRef;
  @ViewChild('Question') Question!: ElementRef;
  @ViewChild('Answer1') Answer1!: ElementRef;
  @ViewChild('Answer2') Answer2!: ElementRef;
  @ViewChild('Answer3') Answer3!: ElementRef;
  @ViewChild('Answer4') Answer4!: ElementRef;
  @ViewChild('Answer11') Answer11!: ElementRef;
  @ViewChild('Answer21') Answer21!: ElementRef;
  @ViewChild('Answer31') Answer31!: ElementRef;
  @ViewChild('Answer12') Answer12!: ElementRef;
  @ViewChild('Answer22') Answer22!: ElementRef;
  public testFormat: string = "";
  public correctAnswer: number = 0;
  public value: any = null;

  constructor(private router: Router) {}

  public async GetTestData(): Promise<void> {
    await fetch(this.url + `GetTestData?catName=${this.catType}&quizName=${this.testType}&questionNumber=${this.currentQuestion + 1}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      let testFormat = JSON.parse(JSON.stringify(data));
      localStorage.setItem("TestTypeForUpdating", JSON.stringify(Object.values(testFormat)[3]));
    });

    this.testFormat = localStorage.getItem("TestTypeForUpdating")!.slice(1, localStorage.getItem('TestTypeForUpdating')!.length - 1);
  }

  public async getAllQuestionsFromBack(): Promise<void> {
    await fetch(this.url + `ReadQuestions?catName=${this.catType}&quizName=${this.testType}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      Object.keys(data).forEach((key) =>
      {
        this.questions.push(data[key]);
      });
    });
  }

  public onChange(e: any): void {
    this.correctAnswer = e.target.value;
  }

  public ShuffleAnswers(): void{
    let temp = this.Answer12.nativeElement.value;
    this.Answer12.nativeElement.value = this.Answer22.nativeElement.value;
    this.Answer22.nativeElement.value = temp;
  }

  public async UpdateQuestion(): Promise<void> {
    await this.GetTestData(); // Wait for GetTestData() to complete
    this.currentQuestion++;

    if (this.testFormat === "three-answers")
    {
      if (this.Question.nativeElement.value != "" && this.Answer11.nativeElement.value != "" &&
        this.Answer21.nativeElement.value != "" && this.Answer31.nativeElement.value != "" && this.correctAnswer != 0)
      {
        let question: Question = {quizType: this.catType, quizName: this.testType,
          testFormat: this.testFormat, question: this.Question.nativeElement.value,
          option1: this.Answer11.nativeElement.value, option2: this.Answer21.nativeElement.value,
          option3: this.Answer31.nativeElement.value, option4: null, answer: this.correctAnswer,
          questionNumber: this.currentQuestion, points: this.Points.nativeElement.value,
          timeToAnswer: this.Time.nativeElement.value}

        await fetch(this.url + `UpdateQuestion?catName=${this.catType}&quizName=${this.testType}&questionNumber=${this.currentQuestion}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(question)
        })

        localStorage.setItem(`question${this.currentQuestion}`, this.Question.nativeElement.value);
        localStorage.setItem(`answer1${this.currentQuestion}`, this.Answer11.nativeElement.value);
        localStorage.setItem(`answer2${this.currentQuestion}`, this.Answer21.nativeElement.value);
        localStorage.setItem(`answer3${this.currentQuestion}`, this.Answer31.nativeElement.value);
      }
      else{
        Swal.fire('Oops', 'Please fill in all fields!', 'error');
      }
    }
    else if (this.testFormat === "true-false-answers")
    {
      if (this.Question.nativeElement.value != "" && this.correctAnswer != 0)
      {
        let question: Question = {quizType: this.catType, quizName: this.testType,
          testFormat: this.testFormat, question: this.Question.nativeElement.value,
          option1: this.Answer12.nativeElement.value, option2: this.Answer22.nativeElement.value,
          option3: null, option4: null, answer: this.correctAnswer, questionNumber: this.currentQuestion,
          points: this.Points.nativeElement.value, timeToAnswer: this.Time.nativeElement.value}

        await fetch(this.url + `UpdateQuestion?catName=${this.catType}&quizName=${this.testType}&questionNumber=${this.currentQuestion}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(question)
        })

        localStorage.setItem(`question${this.currentQuestion}`, this.Question.nativeElement.value);
        localStorage.setItem(`answer1${this.currentQuestion}`, this.Answer12.nativeElement.value);
        localStorage.setItem(`answer2${this.currentQuestion}`, this.Answer22.nativeElement.value);
      }
      else{
        Swal.fire('Oops', 'Please fill in all fields!', 'error');
      }
    }
    else {
      if (this.Question.nativeElement.value != "" && this.Answer1.nativeElement.value != "" &&
        this.Answer2.nativeElement.value != "" && this.Answer3.nativeElement.value != "" && this.Answer4.nativeElement.value != ""
        && this.correctAnswer != 0)
      {
        let question: Question = {quizType: this.catType, quizName: this.testType,
          testFormat: this.testFormat, question: this.Question.nativeElement.value,
          option1: this.Answer1.nativeElement.value, option2: this.Answer2.nativeElement.value,
          option3: this.Answer3.nativeElement.value, option4: this.Answer4.nativeElement.value,
          answer: this.correctAnswer, questionNumber: this.currentQuestion, points: this.Points.nativeElement.value,
          timeToAnswer: this.Time.nativeElement.value}

        await fetch(this.url + `UpdateQuestion?catName=${this.catType}&quizName=${this.testType}&questionNumber=${this.currentQuestion}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(question)
        })

        localStorage.setItem(`question${this.currentQuestion}`, this.Question.nativeElement.value);
        localStorage.setItem(`answer1${this.currentQuestion}`, this.Answer1.nativeElement.value);
        localStorage.setItem(`answer2${this.currentQuestion}`, this.Answer2.nativeElement.value);
        localStorage.setItem(`answer3${this.currentQuestion}`, this.Answer3.nativeElement.value);
        localStorage.setItem(`answer4${this.currentQuestion}`, this.Answer4.nativeElement.value);
      }
      else {
        Swal.fire('Oops', 'Please fill in all fields!', 'error');
      }
    }
  }

  public async nextQuestion(): Promise<void> {
    this.currentQuestion++;
    await this.GetTestData(); // Wait for GetTestData() to complete
  }

  public FinishProcess(): void{
    this.isQuizCompleted = true;
  }

  public async previousQuestion(): Promise<void> {
    this.currentQuestion--;
    await this.GetTestData(); // Wait for GetTestData() to complete
    if (this.testFormat === "three-answers") {
      this.Question.nativeElement.value = localStorage.getItem(`question${this.currentQuestion}`);
      this.Answer11.nativeElement.value = localStorage.getItem(`answer1${this.currentQuestion}`);
      this.Answer21.nativeElement.value = localStorage.getItem(`answer2${this.currentQuestion}`);
      this.Answer31.nativeElement.value = localStorage.getItem(`answer3${this.currentQuestion}`);
    }
    else if (this.testFormat === "true-false-answers") {
      this.Question.nativeElement.value = localStorage.getItem(`question${this.currentQuestion}`);
      this.Answer12.nativeElement.value = localStorage.getItem(`answer1${this.currentQuestion}`);
      this.Answer22.nativeElement.value = localStorage.getItem(`answer2${this.currentQuestion}`);
    }
    else {
      this.Question.nativeElement.value = localStorage.getItem(`question${this.currentQuestion}`);
      this.Answer1.nativeElement.value = localStorage.getItem(`answer1${this.currentQuestion}`);
      this.Answer2.nativeElement.value = localStorage.getItem(`answer2${this.currentQuestion}`);
      this.Answer3.nativeElement.value = localStorage.getItem(`answer3${this.currentQuestion}`);
      this.Answer4.nativeElement.value = localStorage.getItem(`answer4${this.currentQuestion}`);
    }
  }

  public async deleteQuestion(): Promise<void>{
    await fetch(this.url + `RemoveQuestion?catName=${this.catType}&quizName=${this.testType}&questionNumber=${this.currentQuestion}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public ToMenu(): void {
    this.router.navigate(['/app/player-options-form']);
  }

  public clearInputs(): void{
    this.Question.nativeElement.value = "";
    this.Answer1.nativeElement.value = "";
    this.Answer2.nativeElement.value = "";
    this.Answer3.nativeElement.value = "";
    this.Answer4.nativeElement.value = "";
    this.Answer11.nativeElement.value = "";
    this.Answer21.nativeElement.value = "";
    this.Answer31.nativeElement.value = "";
    this.value = null;
  }

  public ngOnInit(): void {
    this.name = localStorage.getItem("Login")!;
    this.testType = localStorage.getItem("TestNameForUpdating")!;
    this.catType = localStorage.getItem("CatNameForUpdating")!;
    this.GetTestData();
    this.getAllQuestionsFromBack();
    localStorage.removeItem("TestNameForUpdating"); // Don't need anymore
    localStorage.removeItem("CatNameForUpdating"); // Don't need anymore
  }

  ngOnDestroy(): void {
    localStorage.removeItem('TestTypeForUpdating'); // Don't need anymore
    for (let i: number = 1; i <= this.currentQuestion; i++) // Deleting resources
    {
      localStorage.removeItem(`question${i}`);
      localStorage.removeItem(`answer1${i}`);
      localStorage.removeItem(`answer2${i}`);
      localStorage.removeItem(`answer3${i}`);
      localStorage.removeItem(`answer4${i}`);
    }
  }
}
