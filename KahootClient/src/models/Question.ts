export type Question = {
  id?: number;
  quizType: string; // Category
  quizName: string; // Test name
  testFormat: string;
  question: string;
  option1: string;
  option2: string;
  option3: string | null;
  option4: string | null;
  answer: number;
  questionNumber: number;
  points: number;
  timeToAnswer: number;
}
