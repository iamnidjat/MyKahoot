export class User{
  public id: number | undefined;

  constructor(public userName: string | undefined,
              public name: string | undefined,
              public surname: string | undefined,
              public password: string | undefined,
              public email: string | undefined,
              public backUpEmail: string | undefined,
              public birthday: Date | undefined,
              public role: string | undefined) {  }

  public get Id() {
    return this.id;
  }

  public get Username() {
    return this.userName;
  }

  public get Name() {
    return this.name;
  }

  public get Surname() {
    return this.surname;
  }

  public get Password() {
    return this.password;
  }

  public get Email() {
    return this.email;
  }

  public get BackUpEmail() {
    return this.backUpEmail;
  }

  public get Birthday() {
    return this.birthday;
  }

  public get Role() {
    return this.role;
  }
}

// type User = {
//   id: number;
//   login: string;
//   password: string;
// };
