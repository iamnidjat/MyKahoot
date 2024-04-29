import {CreatedQuizStats} from "./CreatedQuizStats";

export type CreatedQuiz = {
  id?: number;
  categoryName: string;
  quizName: string;
  userName: string;
  isPrivate: boolean;
  quizCode: string;
  userId: number;
  createdQuizStats?: CreatedQuizStats;
}
