import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PlayerSurveyChoosingFormComponent} from "../player-survey-choosing-form/player-survey-choosing-form.component";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {CreatedQuiz} from "../CreatedQuiz";
import { Question } from 'src/Question';

@Component({
  selector: 'app-update-quiz-form',
  templateUrl: './update-quiz-form.component.html',
  styleUrls: ['./update-quiz-form.component.css']
})

export class UpdateQuizFormComponent implements OnInit{
  public name: string = "";
  public testType: string = "";
  public currentQuestion: number = 0;
  public isQuizCompleted: boolean = false;
  public questions: any = [];
  private url: string = "https://localhost:7176/api/v1/Quiz/";
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
  public testFormat: string | null = "";
  public correctAnswer: number = 0;
  public value: any = null;

  constructor( private router: Router) {
    this.testFormat = localStorage.getItem('testFormat');
  }

  // ngOnDestroy(): void {
  //   localStorage.removeItem("CategoryType");
  //   localStorage.removeItem("TestName");
  // }

  public async GetTestData(): Promise<void> {
    await fetch(this.url + `GetTestData?quizName=${localStorage.getItem("TestName")}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      let testFormat = JSON.parse(JSON.stringify(data));
      localStorage.setItem("testType", JSON.stringify(Object.values(testFormat)[3]));
    });

    this.testFormat = localStorage.getItem("testType")!.slice(1, localStorage.getItem('testType')!.length - 1);
  }

  public async getAllQuestionsFromBack(): Promise<void> {
    await fetch(this.url + `ReadQuestions?quizName=${localStorage.getItem("TestName")}`, {
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

  public ngOnInit(): void {
    this.name = localStorage.getItem("Login")!;
    this.testType = localStorage.getItem("TestName")!;
    this.GetTestData();
    this.getAllQuestionsFromBack();
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
    this.currentQuestion++;

    if (localStorage.getItem("testFormat") == "three-answers")
    {
      if (this.Question.nativeElement.value != "" && this.Answer11.nativeElement.value != "" &&
        this.Answer21.nativeElement.value != "" && this.Answer31.nativeElement.value != "" && this.correctAnswer != 0)
      {
        let question: Question = new Question(localStorage.getItem("CategoryType")!, localStorage.getItem("TestName")!,
          localStorage.getItem("testFormat")!, this.Question.nativeElement.value, this.Answer11.nativeElement.value, this.Answer21.nativeElement.value,
          this.Answer31.nativeElement.value, null!, this.correctAnswer, this.currentQuestion);

        await fetch(this.url + `UpdateQuestion?question=${localStorage.getItem(`question${this.currentQuestion}`)}`, {
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
    else if (localStorage.getItem("testFormat") == "true-false-answers")
    {
      if (this.Question.nativeElement.value != "" && this.correctAnswer != 0)
      {
        let question: Question = new Question(localStorage.getItem("CategoryType")!, localStorage.getItem("TestName")!,
          localStorage.getItem("testFormat")!, this.Question.nativeElement.value, this.Answer12.nativeElement.value, this.Answer22.nativeElement.value,
          null!, null!, this.correctAnswer, this.currentQuestion);

        await fetch(this.url + `UpdateQuestion?question=${localStorage.getItem(`question${this.currentQuestion}`)}`, {
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
        let question: Question = new Question(localStorage.getItem("CategoryType")!, localStorage.getItem("TestName")!,
          localStorage.getItem("testFormat")!, this.Question.nativeElement.value, this.Answer1.nativeElement.value, this.Answer2.nativeElement.value,
          this.Answer3.nativeElement.value, this.Answer4.nativeElement.value, this.correctAnswer, this.currentQuestion);

        alert(this.Question.nativeElement.value);

        await fetch(this.url + `UpdateQuestion?question=${localStorage.getItem(`question${this.currentQuestion}`)}`, {
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
  }

  public FinishProcess(): void{
    this.isQuizCompleted = true;
  }

  public previousQuestion(): void {
    if (localStorage.getItem("testFormat") == "three-answers")
    {
      this.Question.nativeElement.value = localStorage.getItem(`question${this.currentQuestion}`);
      this.Answer11.nativeElement.value = localStorage.getItem(`answer1${this.currentQuestion}`);
      this.Answer21.nativeElement.value = localStorage.getItem(`answer2${this.currentQuestion}`);
      this.Answer31.nativeElement.value = localStorage.getItem(`answer3${this.currentQuestion}`);
    }
    else if (localStorage.getItem("testFormat") == "true-false-answers")
    {
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

    this.currentQuestion--;
  }

  public async deleteQuestion(): Promise<void>{
    await fetch(this.url + `RemoveQuestion?quizname=${localStorage.getItem("TestName")!}&question=${this.Question.nativeElement.value}`, {
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
}
