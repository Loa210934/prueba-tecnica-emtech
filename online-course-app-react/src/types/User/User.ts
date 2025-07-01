export interface AuthUser {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  token: string;
}
export interface CoursesUser {
  joinDate: string;
  totalCourses: number;
  completedCourses: number;
  totalHours: number;
  certificates: number;
  currentStreak: number;
  level: string;
}

export const userData: CoursesUser = {
  joinDate: 'Enero 2023',
  totalCourses: 8,
  completedCourses: 3,
  totalHours: 156,
  certificates: 3,
  currentStreak: 12,
  level: 'Intermedio',
};


