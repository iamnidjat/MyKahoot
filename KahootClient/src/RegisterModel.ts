export class RegisterModel{
  public id: number | undefined;

  constructor(public login: string | undefined,
              public password: string | undefined,
              public cPassword: string | undefined,
              public email: string | undefined,
              public birthday: Date | undefined, ) {  }

  public get Id() {
    return this.id;
  }

  public get Login() {
    return this.login;
  }

  public get Password() {
    return this.password;
  }

  public get CPassword() {
    return this.cPassword;
  }

  public get Email() {
    return this.email;
  }

  public get Birthday() {
    return this.birthday;
  }
};
