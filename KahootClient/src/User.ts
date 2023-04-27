export class User{
  public id: number | undefined;

  constructor(public userName: string | undefined,
              public password: string | undefined) {  }

  public get Id() {
    return this.id;
  }

  public get Username() {
    return this.userName;
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
