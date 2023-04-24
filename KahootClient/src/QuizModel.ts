export class QuizModel{
  public id: number | undefined;

  constructor(public quizName: string | undefined,
              public score: number | undefined,
              public userName: string | undefined) {  }

  public get Id() {
    return this.id;
  }

  public get QuizName() {
    return this.quizName;
  }

  public get UserName() {
    return this.userName;
  }

  public get Score() {
    return this.score;
  }
};
