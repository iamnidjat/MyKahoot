export type QuizModel = {
  id?: number;
  categoryName: string;
  quizName: string;
  score: number;
  userName: string;
  passedDate: Date,
  isVisible: boolean;
  level: string;
  averageResponseTime: number;
  correctAnswersCount: number;
  wrongAnswersCount: number;
  skippedQuestionsCount: number;
  userId: number;
}
