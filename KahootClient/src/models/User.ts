// another way to define a class
// export class User {
//   constructor(
//     public id: number | undefined,
//     public userName: string | undefined,
//     public name: string | undefined,
//     public surname: string | undefined,
//     public password: string | undefined,
//     public email: string | undefined,
//     public backUpEmail: string | undefined,
//     public birthday: Date | undefined,
//     public role: string | undefined,
//     public provider: string | undefined,
//     public photoURL: string | undefined
//   ) {}
// }


export type User = {
  id?: number;
  userName: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  backUpEmail: string;
  birthday: Date;
  role: string;
  provider: string;
  overallPoints: number;
  photoURL: string;
};
