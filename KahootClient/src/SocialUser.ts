export class SocialUser{
  public id: number | undefined;

  constructor(public userName: string | undefined,
              public name: string | undefined,
              public email: string | undefined,
              public role: string | undefined,
              public provider: string | undefined) {  }

  public get Id() {
    return this.id;
  }

  public get Username() {
    return this.userName;
  }

  public get Name() {
    return this.name;
  }

  public get Email() {
    return this.email;
  }

  public get Role() {
    return this.role;
  }
  public get Provider() {
    return this.provider;
  }
}

