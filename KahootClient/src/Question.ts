export class Question{
  public id: number | undefined;

  constructor(public quizType: string | undefined,
              public quizName: string | undefined,
              public testFormat: string | undefined,
              public question: string | undefined,
              public option1: string | undefined,
              public option2: string | undefined,
              public option3: string | undefined,
              public option4: string | undefined,
              public answer: number | undefined,
              public questionNumber: number | undefined) {}

  public get Id() {
    return this.id;
  }

  public get QuizType() {
    return this.quizType;
  }

  public get QuizName() {
    return this.quizName;
  }

  public get TestFormat() {
    return this.testFormat
  }

  public get Question() {
    return this.question;
  }

  public get Option1() {
    return this.option1;
  }

  public get Option2() {
    return this.option2;
  }

  public get Option3() {
    return this.option3;
  }

  public get Option4() {
    return this.option4;
  }

  public get Answer() {
    return this.answer;
  }

  public get QuestionNumber() {
    return this.questionNumber;
  }
}
