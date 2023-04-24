export class User{
  public id: number | undefined;

  constructor(public login: string | undefined,
              public password: string | undefined) {  }

  public get Id() {
    return this.id;
  }

  public get Login() {
    return this.login;
  }

  public get Password() {
    return this.password;
  }
};
// type User = {
//   id: number;
//   login: string;
//   password: string;
// };
