export interface AssessmentGlobalResults {
  courseId: string;
  answers: number[];
  results: EvaluationOutcome[];
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
}

export interface EvaluationOutcome {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  category: string;
}
