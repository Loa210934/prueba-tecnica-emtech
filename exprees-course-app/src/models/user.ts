import { Schema, model, Document, Error } from 'mongoose';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import config from '../config/vars';

export interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  age?: number;
  password?: string;
  token: string;
  status: boolean;
  joinDate: Date;
  totalCourses: number;
  completedCourses: number;
  totalHours: number;
  certificates: string[];
  currentStreak: number;
  level: string;
  courses: {
    course: Schema.Types.ObjectId;
    progress: number;
    completedLessons: number;
    lastAccessed: string;
    status: string;
    nextLesson: string;
  }[];
  // Methods
  validPassword: (_password: string) => boolean;
  signin: () => void;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      index: true,
    },
    password: { type: String, select: false },
    age: { type: Number, default: 0, required: true },
    token: { type: String },
    status: { type: Boolean, default: true, required: true },
    joinDate: { type: Date, default: Date.now, required: true },
    totalCourses: { type: Number, default: 0, required: true },
    completedCourses: { type: Number, default: 0, required: true },
    totalHours: { type: Number, default: 0, required: true },
    certificates: { type: [String], default: [], required: true },
    courses: [
      {
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        progress: { type: Number, default: 0, required: true },
        completedLessons: { type: Number, default: 0, required: true },
        lastAccessed: { type: String, default: '', required: true },
        status: { type: String, default: 'En progreso', required: true },
        nextLesson: { type: String, default: '', required: true },
      },
    ],
    currentStreak: {
      type: Number,
      default: 0,
      required: true,
    },
    level: { type: String, default: 'Principate', required: true },
  },
  { timestamps: true }
);

userSchema.methods.validPassword = function fn(password: string) {
  return bcrypt.compareSync(password, this.password || '');
};

userSchema.post('save', function fn(_doc, next) {
  _doc.password = undefined;
  next();
});

userSchema.pre('save', function fn(next) {
  if (this.password && this.password !== '') {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(this.password, salt);
      this.password = hash;
      next();
    } catch (error: unknown) {
      next(error as Error);
    }
  } else {
    next();
  }
});

userSchema.methods.signin = function fn() {
  this.token = sign(
    {
      _id: this._id,
    },
    config.jwtSecret,
    { expiresIn: Number(config.jwtExpirationInterval) * 60 }
  );
};

export const User = model<IUser>('User', userSchema);
