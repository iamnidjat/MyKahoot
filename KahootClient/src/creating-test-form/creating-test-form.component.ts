import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChooseTypeOfQuizFormComponent} from "../choose-type-of-quiz-form/choose-type-of-quiz-form.component";
import {CreatingQuizOptionFormComponent} from "../creating-quiz-option-form/creating-quiz-option-form.component";

@Component({
  selector: 'app-creating-test-form',
  templateUrl: './creating-test-form.component.html',
  styleUrls: ['./creating-test-form.component.css']
})

export class CreatingTestFormComponent implements OnInit{
  public name: string = "";
  public testType: string = "";
  public currentQuestion: number = 0;
  public isQuizCompleted: boolean = false;
  public variable: ChooseTypeOfQuizFormComponent;
  yourQuestionsArray: any = [];
  yourQuestionsObject: any = {"questions": [{
    "questionText": "",
      "options": [
        {"text1": ""},
        {"text2": ""},
        {"text3": ""},
        {"text4": ""}
      ]
    }]};
  @ViewChild('Question') Question!: ElementRef;
  @ViewChild('Answer1') Answer1!: ElementRef;
  @ViewChild('Answer2') Answer2!: ElementRef;
  @ViewChild('Answer3') Answer3!: ElementRef;
  @ViewChild('Answer4') Answer4!: ElementRef;
  public testFormat: string | null = "";
  constructor(private  _variable: ChooseTypeOfQuizFormComponent) { // !
    this.variable = _variable;
    this.testFormat = localStorage.getItem('testFormat');
    localStorage.removeItem('testFormat');
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
  }

  public nextQuestion(): void {
    this.currentQuestion++;

    // this.yourQuestionsObject.questions.questionText = this.Question.nativeElement.innerText;
    // this.yourQuestionsObject.questions.text1 = this.Answer1.nativeElement.innerText;
    // this.yourQuestionsObject.questions.text2 = this.Answer2.nativeElement.innerText;
    // this.yourQuestionsObject.questions.text3 = this.Answer3.nativeElement.innerText;
    // this.yourQuestionsObject.questions.text4 = this.Answer4.nativeElement.innerText;
    // this.yourQuestionsArray.push(this.yourQuestionsObject);
    //
    // console.log(this.yourQuestionsArray);
  }
  public previousQuestion(): void {
    this.currentQuestion--;


  }
  public resetQuiz(): void {
    this.currentQuestion = 0;

    //this.yourQuestionsArray.length = 0;
  }
}
