import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import { Question } from 'src/models/Question';
import {QuestionService} from "../../services/question.service";

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

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
  public testFormat: string = "";
  public correctAnswer: number = 0;
  public videoFile: File | null = null;
  public photoFile: File | null = null;
  public audioFile: File | null = null;
  public api: string = "https://localhost:7176";

  constructor(private router: Router, private questionService: QuestionService) {}

  public async GetTestData(): Promise<void> {
    await fetch(API_URL + `GetTestData?catName=${this.catType}&quizName=${this.testType}&questionNumber=${this.currentQuestion + 1}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      localStorage.setItem("testType", data.testFormat)
      localStorage.setItem("correctAnswer", data.answer)
      this.Time.nativeElement.value = data.timeToAnswer;
      this.Points.nativeElement.value = data.points;
    });

    this.testFormat = localStorage.getItem("testType")!;
    this.correctAnswer = parseInt(localStorage.getItem("correctAnswer")!);
  }

  public async getAllQuestionsFromBack(): Promise<void> {
    await fetch(API_URL + `ReadQuestions?catName=${this.catType}&quizName=${this.testType}`, {
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

        await this.questionService.addQuestionAsync(question, this.photoFile, this.videoFile, this.audioFile, true);

        localStorage.setItem(`question${this.currentQuestion + 1}`, this.Question.nativeElement.value);
        localStorage.setItem(`answer1${this.currentQuestion + 1}`, this.Answer11.nativeElement.value);
        localStorage.setItem(`answer2${this.currentQuestion + 1}`, this.Answer21.nativeElement.value);
        localStorage.setItem(`answer3${this.currentQuestion + 1}`, this.Answer31.nativeElement.value);
        localStorage.setItem(`correctAnswer${this.currentQuestion + 1}`, this.correctAnswer.toString());
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

        await this.questionService.addQuestionAsync(question, this.photoFile, this.videoFile, this.audioFile, true);

        localStorage.setItem(`question${this.currentQuestion + 1}`, this.Question.nativeElement.value);
        localStorage.setItem(`answer1${this.currentQuestion + 1}`, this.Answer12.nativeElement.value);
        localStorage.setItem(`answer2${this.currentQuestion + 1}`, this.Answer22.nativeElement.value);
        localStorage.setItem(`correctAnswer${this.currentQuestion + 1}`, this.correctAnswer.toString());
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


        await this.questionService.addQuestionAsync(question, this.photoFile, this.videoFile, this.audioFile, true);

        localStorage.setItem(`question${this.currentQuestion + 1}`, this.Question.nativeElement.value);
        localStorage.setItem(`answer1${this.currentQuestion + 1}`, this.Answer1.nativeElement.value);
        localStorage.setItem(`answer2${this.currentQuestion + 1}`, this.Answer2.nativeElement.value);
        localStorage.setItem(`answer3${this.currentQuestion + 1}`, this.Answer3.nativeElement.value);
        localStorage.setItem(`answer4${this.currentQuestion + 1}`, this.Answer4.nativeElement.value);
        localStorage.setItem(`correctAnswer${this.currentQuestion + 1}`, this.correctAnswer.toString());
      }
      else {
        Swal.fire('Oops', 'Please fill in all fields!', 'error');
      }
    }
    this.currentQuestion++;

    if (this.currentQuestion == this.questions.length) {
      this.finishProcess();
    } else {
      await this.GetTestData(); // Wait for GetTestData() to complete
    }
  }

  public async nextQuestion(): Promise<void> {
    if (this.testFormat === "three-answers")
    {
        localStorage.setItem(`question${this.currentQuestion + 1}`, this.Question.nativeElement.value);
        localStorage.setItem(`answer1${this.currentQuestion + 1}`, this.Answer11.nativeElement.value);
        localStorage.setItem(`answer2${this.currentQuestion + 1}`, this.Answer21.nativeElement.value);
        localStorage.setItem(`answer3${this.currentQuestion + 1}`, this.Answer31.nativeElement.value);
        localStorage.setItem(`correctAnswer${this.currentQuestion + 1}`, this.correctAnswer.toString());
    }
    else if (this.testFormat === "true-false-answers")
    {
        localStorage.setItem(`question${this.currentQuestion + 1}`, this.Question.nativeElement.value);
        localStorage.setItem(`answer1${this.currentQuestion + 1}`, this.Answer12.nativeElement.value);
        localStorage.setItem(`answer2${this.currentQuestion + 1}`, this.Answer22.nativeElement.value);
        localStorage.setItem(`correctAnswer${this.currentQuestion + 1}`, this.correctAnswer.toString());
    }
    else {
        localStorage.setItem(`question${this.currentQuestion + 1}`, this.Question.nativeElement.value);
        localStorage.setItem(`answer1${this.currentQuestion + 1}`, this.Answer1.nativeElement.value);
        localStorage.setItem(`answer2${this.currentQuestion + 1}`, this.Answer2.nativeElement.value);
        localStorage.setItem(`answer3${this.currentQuestion + 1}`, this.Answer3.nativeElement.value);
        localStorage.setItem(`answer4${this.currentQuestion + 1}`, this.Answer4.nativeElement.value);
        localStorage.setItem(`correctAnswer${this.currentQuestion + 1}`, this.correctAnswer.toString());
    }
    this.currentQuestion++;
    await this.GetTestData(); // Wait for GetTestData() to complete
  }

  public finishProcess(): void{
    this.isQuizCompleted = true;
  }

  public async previousQuestion(): Promise<void> {
    this.currentQuestion--;
    alert(this.currentQuestion);
    await this.GetTestData(); // Wait for GetTestData() to complete
    if (this.testFormat === "three-answers") {
      this.Question.nativeElement.value = localStorage.getItem(`question${this.currentQuestion + 1}`);
      this.Answer11.nativeElement.value = localStorage.getItem(`answer1${this.currentQuestion + 1}`);
      this.Answer21.nativeElement.value = localStorage.getItem(`answer2${this.currentQuestion + 1}`);
      this.Answer31.nativeElement.value = localStorage.getItem(`answer3${this.currentQuestion + 1}`);
      this.saveRadioOptions(this.RadioOption11, this.RadioOption21, this.RadioOption31);
    }
    else if (this.testFormat === "true-false-answers") {
      this.Question.nativeElement.value = localStorage.getItem(`question${this.currentQuestion + 1}`);
      this.Answer12.nativeElement.value = localStorage.getItem(`answer1${this.currentQuestion + 1}`);
      this.Answer22.nativeElement.value = localStorage.getItem(`answer2${this.currentQuestion + 1}`);
      this.saveRadioOptions(this.RadioOption12, this.RadioOption22);
    }
    else {
      this.Question.nativeElement.value = localStorage.getItem(`question${this.currentQuestion + 1}`);
      this.Answer1.nativeElement.value = localStorage.getItem(`answer1${this.currentQuestion + 1}`);
      this.Answer2.nativeElement.value = localStorage.getItem(`answer2${this.currentQuestion + 1}`);
      this.Answer3.nativeElement.value = localStorage.getItem(`answer3${this.currentQuestion + 1}`);
      this.Answer4.nativeElement.value = localStorage.getItem(`answer4${this.currentQuestion + 1}`);
      this.saveRadioOptions(this.RadioOption1, this.RadioOption2, this.RadioOption3, this.RadioOption4);
    }
  }

  private saveRadioOptions(...radioOptions: ElementRef[]): void {
    const correctAnswer = localStorage.getItem(`correctAnswer${this.currentQuestion}`);
    if (correctAnswer) {
      const optionIndex = parseInt(correctAnswer);
      radioOptions[optionIndex - 1].nativeElement.checked = true;
    }
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

  public async deleteQuestion(): Promise<void>{
    const response = await fetch(API_URL + `RemoveQuestion?catName=${this.catType}&quizName=${this.testType}&questionNumber=${this.currentQuestion + 1}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log(response);
    const data = await response.json();
    console.log("aaa", data);

    if (data.status == 200) {
      this.currentQuestion--;
      if (this.currentQuestion == 0) {
        this.finishProcess();
        await this.deleteYourQuizzes(this.catType, this.testType);
      }
    }
  }

  private async deleteYourQuizzes(categoryName: string, testName: string): Promise<void>{
    await fetch(API_URL + `DeleteQuiz?categoryName=${categoryName}&testName=${testName}`, {
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

  public ngOnInit(): void {
    this.name = localStorage.getItem("Login")!;
    this.testType = localStorage.getItem("TestNameForUpdating")!;
    this.catType = localStorage.getItem("CatNameForUpdating")!;
    this.GetTestData();
    this.getAllQuestionsFromBack();

    setTimeout(() => {
      if (this.testFormat === "three-answers") {
        const radioOption = this[`RadioOption${this.correctAnswer}1` as keyof this] as ElementRef;
        radioOption.nativeElement.checked = true;
      }
      else if (this.testFormat === "true-false-answers") {
        const radioOption = this[`RadioOption${this.correctAnswer}2` as keyof this] as ElementRef;
        radioOption.nativeElement.checked = true;
      }
      else {
        const radioOption = this[`RadioOption${this.correctAnswer}` as keyof this] as ElementRef;
        radioOption.nativeElement.checked = true;
      }
    },500);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('TestTypeForUpdating'); // Don't need anymore
    localStorage.removeItem("TestNameForUpdating"); // Don't need anymore
    localStorage.removeItem("CatNameForUpdating"); // Don't need anymore
    localStorage.removeItem("correctAnswer"); // Don't need anymore
    for (let i: number = 1; i <= this.currentQuestion; i++) // Deleting resources
    {
      localStorage.removeItem(`question${i}`);
      localStorage.removeItem(`answer1${i}`);
      localStorage.removeItem(`answer2${i}`);
      localStorage.removeItem(`answer3${i}`);
      localStorage.removeItem(`answer4${i}`);
      localStorage.removeItem(`correctAnswer${i}`);
    }
  }
}
