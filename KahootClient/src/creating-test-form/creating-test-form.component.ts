import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Question } from 'src/Question';
import {ChooseTypeOfQuizFormComponent} from "../choose-type-of-quiz-form/choose-type-of-quiz-form.component";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {PlayerSurveyChoosingFormComponent} from "../player-survey-choosing-form/player-survey-choosing-form.component";
import {CreatedQuiz} from "../CreatedQuiz";

@Component({
  selector: 'app-creating-test-form',
  templateUrl: './creating-test-form.component.html',
  styleUrls: ['./creating-test-form.component.css']
})

export class CreatingTestFormComponent implements OnInit, OnDestroy{
  public name: string = "";
  public testType: string = "";
  public currentQuestion: number = 0;
  public isQuizCompleted: boolean = false;
  public variable: PlayerSurveyChoosingFormComponent;
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
  public flag: boolean = false;

  constructor(private  _variable: PlayerSurveyChoosingFormComponent, private router: Router) { // !
    this.variable = _variable; // !
    this.testFormat = localStorage.getItem('testFormat');
  }

  ngOnDestroy(): void {
     localStorage.removeItem("CategoryType");
     localStorage.removeItem("TestName");
  }

  public ngOnInit(): void {
    if (localStorage.getItem("Login") !== null) {
      this.name = localStorage.getItem("Login")!;
    }
    if (localStorage.getItem("newLogin") !== null) {
      this.name = localStorage.getItem("newLogin")!;
    }
    if (localStorage.getItem("MixedTestC") !== null) {
      this.testType = localStorage.getItem("MixedTestC")!;
    }
    if (localStorage.getItem("ProgrammingC") !== null) {
      this.testType = localStorage.getItem("ProgrammingC")!;
    }
    if (localStorage.getItem("MathC") !== null) {
      this.testType = localStorage.getItem("MathC")!;
    }
    if (localStorage.getItem("LogicsC") !== null) {
      this.testType = localStorage.getItem("LogicsC")!;
    }
    else
    {
      this.testType = localStorage.getItem("TestName")!;
    }
  }

  public onChange(e: any): void {
    this.correctAnswer = e.target.value;
  }

  public ShuffleAnswers(): void{
    let temp = this.Answer12.nativeElement.value;
    this.Answer12.nativeElement.value = this.Answer22.nativeElement.value;
    this.Answer22.nativeElement.value = temp;
  }

  public async nextQuestion(): Promise<void> {
    this.currentQuestion++; // !

    if (!this.flag)
    {
      if (localStorage.getItem("testFormat") == "three-answers")
      {
        if (this.Question.nativeElement.value != "" && this.Answer11.nativeElement.value != "" &&
          this.Answer21.nativeElement.value != "" && this.Answer31.nativeElement.value != "" && this.correctAnswer != 0)
        {
          let question: Question = new Question(localStorage.getItem("CategoryType")!, localStorage.getItem("TestName")!,
            localStorage.getItem("testFormat")!, this.Question.nativeElement.value, this.Answer11.nativeElement.value, this.Answer21.nativeElement.value,
            this.Answer31.nativeElement.value, null!, this.correctAnswer, this.currentQuestion);

          await fetch(this.url + "AddQuestion", {
            method: "POST",
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
      else if (localStorage.getItem("testFormat") == "true-false-answers") {
        if (this.Question.nativeElement.value != "" && this.correctAnswer != 0)
        {
          let question: Question = new Question(localStorage.getItem("CategoryType")!, localStorage.getItem("TestName")!,
            localStorage.getItem("testFormat")!, this.Question.nativeElement.value, this.Answer12.nativeElement.value, this.Answer22.nativeElement.value,
            null!, null!, this.correctAnswer, this.currentQuestion);

        await fetch(this.url + "AddQuestion", {
          method: "POST",
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
          this.Answer2.nativeElement.value != "" && this.Answer3.nativeElement.value != "" && this.Answer4.nativeElement.value != "" && this.correctAnswer != 0)
        {
          let question: Question = new Question(localStorage.getItem("CategoryType")!, localStorage.getItem("TestName")!,
            localStorage.getItem("testFormat")!, this.Question.nativeElement.value, this.Answer1.nativeElement.value, this.Answer2.nativeElement.value,
            this.Answer3.nativeElement.value, this.Answer4.nativeElement.value, this.correctAnswer, this.currentQuestion);

          await fetch(this.url + "AddQuestion", {
            method: "POST",
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
        else{
          Swal.fire('Oops', 'Please fill in all fields!', 'error');
        }
      }
    }
    else
    {
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

      this.flag = false;
    }

    if (this.currentQuestion === 50)
    {
      this.FinishProcess();
    }

    this.clearInputs();
  }

  public FinishProcess(): void{
    this.isQuizCompleted = true;

    this.variable.variable = localStorage.getItem("CategoryType");

    this.saveCategories();
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
    this.flag = true;
  }

  public async resetQuiz(): Promise<void> {
    this.currentQuestion = 0;
    this.clearInputs();

    await fetch(this.url + `RemoveQuestions?quizName=${localStorage.getItem("TestName")!}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  public ToMenu(): void {
    this.router.navigate(['/app/player-options-form']);
  }

  private clearInputs(): void{
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

  private async saveCategories(): Promise<void>{
    let category: CreatedQuiz = new CreatedQuiz(localStorage.getItem("CategoryType")!, localStorage.getItem("TestName")!,
      parseInt(localStorage.getItem("userId")!));

    await fetch(this.url + "SaveCategory", {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
    },
      body: JSON.stringify(category)
    })
  }
}
