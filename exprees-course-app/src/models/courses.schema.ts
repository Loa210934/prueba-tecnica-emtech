import { Schema, model, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  instructor: string;
  price: number;
  originalPrice: number;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  level: string;
  category: string;
  image: string;
  tags: string[];
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    rating: { type: Number, default: 0, required: true },
    students: { type: Number, default: 0, required: true },
    duration: { type: String, required: true },
    lessons: { type: Number, required: true },
    level: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [], required: true },
  },
  { timestamps: true }
);

export const Course = model<ICourse>('Course', courseSchema);
