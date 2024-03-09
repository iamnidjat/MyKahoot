export type Question = {
  id?: number;
  quizType: string;
  quizName: string;
  testFormat: string;
  question: string;
  option1: string;
  option2: string;
  option3: string | null;
  option4: string | null;
  answer: number;
  questionNumber: number;
}
