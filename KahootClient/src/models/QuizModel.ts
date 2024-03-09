export type QuizModel = {
  id?: number;
  categoryName: string;
  quizName: string;
  score: number;
  userName: string;
  passedDate: Date,
  isVisible: boolean;
  level: string;
  userId: number;
}
