import mongoose, { Schema, Document, Types } from 'mongoose';

export interface EvaluationOutcome {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  category: string;
}

export interface AssessmentGlobalResults extends Document {
  courseId: Types.ObjectId;
  studentId: Types.ObjectId;
  answers: number[];
  results: EvaluationOutcome[];
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
}

const AssessmentGlobalResultsSchema = new Schema<AssessmentGlobalResults>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    answers: [{ type: Number, required: true }],
    results: [
      {
        question: { type: String, required: true },
        selectedAnswer: { type: String, required: true },
        correctAnswer: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
        category: { type: String, required: true },
      },
    ],
    score: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    completedAt: { type: String, required: true },
  },
  { timestamps: true }
);

export const AssessmentResults = mongoose.model<AssessmentGlobalResults>(
  'AssessmentResults',
  AssessmentGlobalResultsSchema
);
