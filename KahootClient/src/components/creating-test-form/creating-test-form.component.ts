import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Question } from 'src/models/Question';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {CreatedQuiz} from "../../models/CreatedQuiz";
import {QuestionService} from "../../services/question.service";
import {GamificationService} from "../../services/gamification.service";

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

@Component({
  selector: 'app-creating-test-form',
  templateUrl: './creating-test-form.component.html',
  styleUrls: ['./creating-test-form.component.css']
})
export class CreatingTestFormComponent implements OnInit, OnDestroy{
  public name: string = "";
  public testType: string = "";
  public quizType: string = "";
  public currentQuestion: number = 0;
  public isQuizCompleted: boolean = false;
  public testFormat: string = "";
  public correctAnswer: number = 0;
  public value: any;
  public flag: boolean = false;
  @ViewChild('Points') Points!: ElementRef;
  @ViewChild('Time') Time!: ElementRef;
  @ViewChild('Question') Question!: ElementRef;
  @ViewChild('Answer1') Answer1!: ElementRef; // When 4 answers, first option
  @ViewChild('Answer2') Answer2!: ElementRef; // When 4 answers, second option
  @ViewChild('Answer3') Answer3!: ElementRef; // When 4 answers, third option
  @ViewChild('Answer4') Answer4!: ElementRef; // When 4 answers, fourth option
  @ViewChild('Answer11') Answer11!: ElementRef; // When 3 answers, first option
  @ViewChild('Answer21') Answer21!: ElementRef; // When 3 answers, second option
  @ViewChild('Answer31') Answer31!: ElementRef; // When 3 answers, third option
  @ViewChild('Answer12') Answer12!: ElementRef; // When 2 answers, first option
  @ViewChild('Answer22') Answer22!: ElementRef; // When 2 answers, second option
  @ViewChild('RadioOption1') RadioOption1!: ElementRef; // When 4 answers, first option
  @ViewChild('RadioOption2') RadioOption2!: ElementRef; // When 4 answers, second option
  @ViewChild('RadioOption3') RadioOption3!: ElementRef; // When 4 answers, third option
  @ViewChild('RadioOption4') RadioOption4!: ElementRef; // When 4 answers, fourth option
  @ViewChild('RadioOption11') RadioOption11!: ElementRef; // When 3 answers, first option
  @ViewChild('RadioOption21') RadioOption21!: ElementRef; // When 3 answers, second option
  @ViewChild('RadioOption31') RadioOption31!: ElementRef; // When 3 answers, third option
  @ViewChild('RadioOption12') RadioOption12!: ElementRef; // When 2 answers, first option
  @ViewChild('RadioOption22') RadioOption22!: ElementRef; // When 2 answers, second option
  @ViewChild('photoInput') photoInput!: ElementRef<HTMLInputElement>; // for clearing photo input after eah question
  @ViewChild('videoInput') videoInput!: ElementRef<HTMLInputElement>; // for clearing video input after eah question
  @ViewChild('audioInput') audioInput!: ElementRef<HTMLInputElement>; // for clearing audio input after eah question
  public videoFile: File | null = null;
  public photoFile: File | null = null;
  public audioFile: File | null = null;
  public isFourAnswersChecked: boolean = false;
  public isThreeAnswersChecked: boolean = false;
  public isTrueFalseAnswersChecked: boolean = false;

  constructor(private router: Router, private questionService: QuestionService, private gamificationService: GamificationService) {}

  ngOnDestroy(): void {
     localStorage.removeItem("MyCategory"); // Don't need anymore
     localStorage.removeItem("MyTestName"); // Don't need anymore
     localStorage.removeItem("testFormat"); // Don't need anymore
     localStorage.removeItem("CategoryType"); // Don't need anymore
     localStorage.removeItem("ManualCategory"); // Don't need anymore
     localStorage.removeItem("GeneratedCode"); // Don't need anymore
     localStorage.removeItem("Private"); // Don't need anymore
     for (let i: number = 1; i <= this.currentQuestion; i++) // Deleting resources
     {
       localStorage.removeItem(`question${i}`);
       localStorage.removeItem(`answer1${i}`);
       localStorage.removeItem(`answer2${i}`);
       localStorage.removeItem(`answer3${i}`);
       localStorage.removeItem(`answer4${i}`);
     }
  }

  public ngOnInit(): void {
    this.name = localStorage.getItem("Login")!;
    this.testFormat = localStorage.getItem('testFormat')!;
    this.testType = localStorage.getItem("MyTestName")!;

    // Set boolean variables based on the value of testFormat
    this.isFourAnswersChecked = this.testFormat === "four-answers";
    this.isThreeAnswersChecked = this.testFormat === "three-answers";
    this.isTrueFalseAnswersChecked = this.testFormat === "true-false-answers";

    const categoryKeys: string[] = ["CategoryType", "ManualCategory", "MyCategory"]; //

    for (const key of categoryKeys) {
      this.quizType = localStorage.getItem(key)!;
      if (this.quizType) {
        break;  // Exit the loop if a non-null/undefined value is found
      }
    }
  }

  public onChange(e: any): void {
    this.correctAnswer = e.target.value;
  }

  public choosingTestFormat(e: any): void {
    this.testFormat = e.target.value;
  }

  public ShuffleAnswers(): void{
    let temp = this.Answer12.nativeElement.value;
    this.Answer12.nativeElement.value = this.Answer22.nativeElement.value;
    this.Answer22.nativeElement.value = temp;
  }

  private checkConditions(question: string, correctAnswer: number, ...answers: string[]): boolean {
    // Check if question is not empty, correctAnswer is not 0, and answers array is not empty
    if (question !== "" && correctAnswer !== 0 && answers.length > 0) {
      // Check if all answers are not empty strings and each is unique
      if (answers.every((answer, index) => answer !== "" && answers.indexOf(answer) === index)) {
        return true;
      }
    }
    return false;
  }

  public async nextQuestion(): Promise<void> {
    this.currentQuestion++; // !

    if (!this.flag)
    {
      if (this.testFormat === "three-answers")
      {
        if (this.checkConditions(this.Question.nativeElement.value, this.correctAnswer, this.Answer11.nativeElement.value,
            this.Answer21.nativeElement.value, this.Answer31.nativeElement.value)) {
          let question: Question = { quizType: this.quizType, quizName: this.testType,
            testFormat: this.testFormat, question: this.Question.nativeElement.value,
            option1: this.Answer11.nativeElement.value, option2: this.Answer21.nativeElement.value,
            option3: this.Answer31.nativeElement.value, option4: null, answer: this.correctAnswer,
            questionNumber: this.currentQuestion, points: this.Points.nativeElement.value,
            timeToAnswer: this.Time.nativeElement.value }

          await this.questionService.GetQuestionsFromDb(question, this.photoFile, this.videoFile, this.audioFile);

          localStorage.setItem(`question${this.currentQuestion}`, this.Question.nativeElement.value);
          localStorage.setItem(`answer1${this.currentQuestion}`, this.Answer11.nativeElement.value);
          localStorage.setItem(`answer2${this.currentQuestion}`, this.Answer21.nativeElement.value);
          localStorage.setItem(`answer3${this.currentQuestion}`, this.Answer31.nativeElement.value);
        }
        else{
          Swal.fire('Oops', 'Please fill in all fields!', 'error');
          this.currentQuestion--;
        }
      }
      else if (this.testFormat === "true-false-answers") {
        if (this.Question.nativeElement.value != "" && this.correctAnswer != 0)
        {
          let question: Question = {quizType: this.quizType, quizName: this.testType ,
            testFormat: this.testFormat, question: this.Question.nativeElement.value,
            option1: this.Answer12.nativeElement.value, option2: this.Answer22.nativeElement.value,
            option3: null, option4: null, answer: this.correctAnswer, questionNumber: this.currentQuestion,
            points: this.Points.nativeElement.value, timeToAnswer: this.Time.nativeElement.value}

          await this.questionService.GetQuestionsFromDb(question, this.photoFile, this.videoFile, this.audioFile);

        localStorage.setItem(`question${this.currentQuestion}`, this.Question.nativeElement.value);
        localStorage.setItem(`answer1${this.currentQuestion}`, this.Answer12.nativeElement.value);
        localStorage.setItem(`answer2${this.currentQuestion}`, this.Answer22.nativeElement.value);
      }
      else{
        Swal.fire('Oops', 'Please fill in all fields!', 'error');
        this.currentQuestion--;
      }
      }
      else {
        if (this.checkConditions(this.Question.nativeElement.value, this.correctAnswer, this.Answer1.nativeElement.value,
          this.Answer2.nativeElement.value, this.Answer3.nativeElement.value, this.Answer4.nativeElement.value))
        {
          let question: Question = {quizType: this.quizType, quizName: this.testType ,
            testFormat: this.testFormat, question: this.Question.nativeElement.value,
            option1: this.Answer1.nativeElement.value, option2: this.Answer2.nativeElement.value,
            option3: this.Answer3.nativeElement.value, option4: this.Answer4.nativeElement.value, answer: this.correctAnswer,
            questionNumber: this.currentQuestion, points: this.Points.nativeElement.value,
            timeToAnswer: this.Time.nativeElement.value}

          await this.questionService.GetQuestionsFromDb(question, this.photoFile, this.videoFile, this.audioFile);

          localStorage.setItem(`question${this.currentQuestion}`, this.Question.nativeElement.value);
          localStorage.setItem(`answer1${this.currentQuestion}`, this.Answer1.nativeElement.value);
          localStorage.setItem(`answer2${this.currentQuestion}`, this.Answer2.nativeElement.value);
          localStorage.setItem(`answer3${this.currentQuestion}`, this.Answer3.nativeElement.value);
          localStorage.setItem(`answer4${this.currentQuestion}`, this.Answer4.nativeElement.value);
        }
        else{
          Swal.fire('Oops', 'Please fill in all fields!', 'error');
          this.currentQuestion--;
        }
      }
    }
    else
    {
      if (this.testFormat === "three-answers")
      {
        if (this.checkConditions(this.Question.nativeElement.value, this.correctAnswer, this.Answer11.nativeElement.value,
          this.Answer21.nativeElement.value, this.Answer31.nativeElement.value))
        {
          let question: Question = { quizType: this.quizType, quizName: this.testType,
            testFormat: this.testFormat, question: this.Question.nativeElement.value,
            option1: this.Answer11.nativeElement.value, option2: this.Answer21.nativeElement.value,
            option3: this.Answer31.nativeElement.value, option4: null, answer: this.correctAnswer,
            questionNumber: this.currentQuestion, points: this.Points.nativeElement.value,
            timeToAnswer: this.Time.nativeElement.value }

          await this.questionService.GetQuestionsFromDb(question, this.photoFile, this.videoFile, this.audioFile);

          localStorage.setItem(`question${this.currentQuestion}`, this.Question.nativeElement.value);
          localStorage.setItem(`answer1${this.currentQuestion}`, this.Answer11.nativeElement.value);
          localStorage.setItem(`answer2${this.currentQuestion}`, this.Answer21.nativeElement.value);
          localStorage.setItem(`answer3${this.currentQuestion}`, this.Answer31.nativeElement.value);
        }
        else{
          Swal.fire('Oops', 'Please fill in all fields!', 'error');
          this.currentQuestion--;
        }
      }
      else if (this.testFormat === "true-false-answers")
      {
        if (this.Question.nativeElement.value != "" && this.correctAnswer != 0)
        {
          let question: Question = {quizType: this.quizType, quizName: this.testType,
            testFormat: this.testFormat, question: this.Question.nativeElement.value,
            option1: this.Answer12.nativeElement.value, option2: this.Answer22.nativeElement.value,
            option3: null, option4: null, answer: this.correctAnswer, questionNumber: this.currentQuestion,
            points: this.Points.nativeElement.value, timeToAnswer: this.Time.nativeElement.value}

          await this.questionService.GetQuestionsFromDb(question, this.photoFile, this.videoFile, this.audioFile);

          localStorage.setItem(`question${this.currentQuestion}`, this.Question.nativeElement.value);
          localStorage.setItem(`answer1${this.currentQuestion}`, this.Answer12.nativeElement.value);
          localStorage.setItem(`answer2${this.currentQuestion}`, this.Answer22.nativeElement.value);
        }
        else{
          Swal.fire('Oops', 'Please fill in all fields!', 'error');
          this.currentQuestion--;
        }
      }
      else {
        if (this.checkConditions(this.Question.nativeElement.value, this.correctAnswer, this.Answer1.nativeElement.value,
          this.Answer2.nativeElement.value, this.Answer3.nativeElement.value, this.Answer4.nativeElement.value))
        {
          let question: Question = {quizType: this.quizType, quizName: this.testType,
            testFormat: this.testFormat, question: this.Question.nativeElement.value,
            option1: this.Answer1.nativeElement.value, option2: this.Answer2.nativeElement.value,
            option3: this.Answer3.nativeElement.value, option4: this.Answer4.nativeElement.value,
            answer: this.correctAnswer, questionNumber: this.currentQuestion,
            points: this.Points.nativeElement.value, timeToAnswer: this.Time.nativeElement.value}

          await this.questionService.GetQuestionsFromDb(question, this.photoFile, this.videoFile, this.audioFile);

          localStorage.setItem(`question${this.currentQuestion}`, this.Question.nativeElement.value);
          localStorage.setItem(`answer1${this.currentQuestion}`, this.Answer1.nativeElement.value);
          localStorage.setItem(`answer2${this.currentQuestion}`, this.Answer2.nativeElement.value);
          localStorage.setItem(`answer3${this.currentQuestion}`, this.Answer3.nativeElement.value);
          localStorage.setItem(`answer4${this.currentQuestion}`, this.Answer4.nativeElement.value);
        }
        else {
          Swal.fire('Oops', 'Please fill in all fields!', 'error');
          this.currentQuestion--;
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

  public onPhotoFileSelected(event: any) {
    this.photoFile = event.target.files[0];
  }

  public onVideoFileSelected(event: any) {
    this.videoFile = event.target.files[0];
  }

  public onAudioFileSelected(event: any) {
    this.audioFile = event.target.files[0];
  }

  public FinishProcess(): void{
    this.isQuizCompleted = true;
    this.saveCategories();
  }

  public previousQuestion(): void {
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

    this.currentQuestion--;
    this.flag = true;
  }

  public async resetQuiz(): Promise<void> {
    this.currentQuestion = 0;
    this.clearInputs();

    await fetch(API_URL + `RemoveQuestions?catName=${this.quizType}&quizName=${this.testType}`, {
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
    // Clear file inputs
    this.photoFile = null;
    this.videoFile = null;
    this.audioFile = null;
    this.photoInput.nativeElement.value = '';
    this.videoInput.nativeElement.value = '';
    this.audioInput.nativeElement.value = '';
    if (this.testFormat === "three-answers")
    {
      this.Answer11.nativeElement.value = "";
      this.Answer21.nativeElement.value = "";
      this.Answer31.nativeElement.value = "";
      this.clearSelection(this.RadioOption11, this.RadioOption21, this.RadioOption31);
    }
    else if (this.testFormat === "four-answers"){
      this.Answer1.nativeElement.value = "";
      this.Answer2.nativeElement.value = "";
      this.Answer3.nativeElement.value = "";
      this.Answer4.nativeElement.value = "";
      this.clearSelection(this.RadioOption1, this.RadioOption2, this.RadioOption3, this.RadioOption4);
    }
    else {
      this.clearSelection(this.RadioOption12, this.RadioOption22);
    }
  }

  private clearSelection(...radioButtons: ElementRef[]): void {
    radioButtons.forEach(radio => {
      radio.nativeElement.checked = false;
    });
  }

  private async saveCategories(): Promise<void>{
    let category: CreatedQuiz = { categoryName: this.quizType,
      quizName: this.testType, userName: localStorage.getItem("Login")!,
      isPrivate: Boolean(localStorage.getItem("Private")),
      quizCode: localStorage.getItem("GeneratedCode")!, userId: parseInt(localStorage.getItem("userId")!) }

    await fetch(API_URL + "SaveCategory", {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
    },
      body: JSON.stringify(category)
    })

    if (await this.gamificationService.upgradeLevelAsync())
    {
      Swal.fire('Level up', `you have increased to level ${parseInt(localStorage.getItem("userLevel")!)}`, 'info');
    }
  }
}
