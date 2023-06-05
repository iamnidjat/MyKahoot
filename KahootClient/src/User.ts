export class User{
  public id: number | undefined;

  constructor(public userName: string | undefined,
              public password: string | undefined,
              public email: string | undefined,
              public birthday: Date | undefined,
              public role: string | undefined) {  }

  public get Id() {
    return this.id;
  }

  public get Username() {
    return this.userName;
  }

  public get Password() {
    return this.password;
  }

  public get Email() {
    return this.email;
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
