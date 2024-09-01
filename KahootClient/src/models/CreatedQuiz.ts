export type CreatedQuiz = {
  id?: number;
  categoryName: string;
  quizName: string;
  userName: string;
  isPrivate: boolean;
  quizCode: string;
  isVIP?: boolean;
  allowedToDownload?: boolean;
  timesPassed?: number;
  averageFeedbackScore?: number;
  likesCount?: number;
  dislikesCount?: number;
  commentsCount?: number;
  userLiked?: boolean;
  userDisliked?: boolean;
  userId: number;
}
