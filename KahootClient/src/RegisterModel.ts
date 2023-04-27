export class RegisterModel{
  public id: number | undefined;

  constructor(public userName: string | undefined,
              public password: string | undefined,
              public confirmPassword: string | undefined,
              public email: string | undefined,
              public birthday: Date | undefined, ) {  }

  public get Id() {
    return this.id;
  }

  public get Username() {
    return this.userName;
  }

  public get Password() {
    return this.password;
  }

  public get ConfirmPassword() {
    return this.confirmPassword;
  }

  public get Email() {
    return this.email;
  }

  public get Birthday() {
    return this.birthday;
  }
};
