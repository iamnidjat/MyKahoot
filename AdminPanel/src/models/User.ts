export type User = {
  id: number;
  username: string | null;
  isUsernameChanged: boolean;
  dateOfChangingUsername: Date | null;
  deadlineForChangingName: number;
  name: string | null;
  surname: string | null;
  password: string | null;
  email: string;
  isEmailChanged: boolean;
  backUpEmail: string | null;
  isEmailConfirmed: boolean;
  birthday: Date;
  role: string;
  provider: string | null;
  photoURL: string | null;
  isFrozen: boolean;
  freezingReason: string | null;
  isBanned: boolean;
  overallPoints: number;
  points: number;
  coins: number;
  level: number;
}
