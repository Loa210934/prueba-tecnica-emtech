export interface CourseType {
  _id: string;
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

export interface EnrolledCourseType extends CourseType {
  progress: number;
  completedLessons: number;
  lastAccessed: string;
  status: 'En progreso' | 'Completado' | 'Pendiente';
  nextLesson?: string;
  certificateId?: string;
}

export interface MinimalCourseDisplay {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  tags: string[];
  category: string;
  minScore?: number;
}
