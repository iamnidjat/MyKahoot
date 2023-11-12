export class CreatedQuiz {
  public id: number | undefined;

  constructor(public categoryName: string | undefined,
              public quizName: string | undefined,
              public userId: number | undefined) {}

  public get Id() {
    return this.id;
  }

  public get QuizName() {
    return this.quizName;
  }

  public get CategoryName() {
    return this.categoryName;
  }

  public get UserId() {
    return this.userId;
  }
}
