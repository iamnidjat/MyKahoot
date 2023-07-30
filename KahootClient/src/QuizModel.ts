import {User} from "./User";

export class QuizModel{
  public id: number | undefined;

  constructor(public quizName: string | undefined,
              public score: number | undefined,
              public userId: number | undefined,
              public userName: string | undefined,
              public passedDate: Date) {  }

  public get Id() {
    return this.id;
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
}
