export class QuizModel{
  public id: number | undefined;

  constructor(public categoryName: string | undefined,
              public quizName: string | undefined,
              public score: number | undefined,
              public userName: string | undefined,
              public passedDate: Date,
              public isVisible: boolean | undefined,
              public level: string | undefined,
              public userId: number | undefined) {  }

  public get Id() {
    return this.id;
  }

  public get CategoryName() {
    return this.categoryName;
  }

  public get QuizName() {
      return this.quizName;
  }

  public get UserId() {
    return this.userId;
  }

  public get Score() {
    return this.score;
  }

  public get UserName() {
    return this.userName;
  }

  public get PassedDate() {
    return this.passedDate;
  }

  public get IsVisible() {
    return this.isVisible;
  }

  public get Level() {
    return this.level;
  }
}
