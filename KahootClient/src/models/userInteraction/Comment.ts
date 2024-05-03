export type Comment = {
  id?: number;
  content: string;
  date: Date;
  authorId: number;
  createdQuizId: number;
  authorName?: string;
}
