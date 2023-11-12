export class DeletedAcc{
  public id: number | undefined;

  constructor(public userName: string | undefined,
              public email: string | undefined,
              public reason: string | undefined) {  }

  public get Id() {
    return this.id;
  }

  public get Username() {
    return this.userName;
  }

  public get Email() {
    return this.email;
  }

  public get Reason() {
    return this.reason;
  }
}
