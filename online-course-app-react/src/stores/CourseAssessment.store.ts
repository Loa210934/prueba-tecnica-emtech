import type { AssessmentGlobalResults } from '@/types/Courses/AssessmentsTypes';
import type { CourseType } from '@/types/Courses/CourseType';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CourseAssessmentState {
  course: CourseType | null;
  assessment: AssessmentGlobalResults | null;
  setCourse: (course: CourseType) => void;
  setAssessment: (assessment: AssessmentGlobalResults) => void;
  clear: () => void;
}

export const useCourseAssessmentStore = create<CourseAssessmentState>()(
  persist(
    set => ({
      course: null,
      assessment: null,
      setCourse: course => set({ course }),
      setAssessment: assessment => set({ assessment }),
      clear: () => set({ course: null, assessment: null }),
    }),
    {
      name: 'course-assessment-storage',
    },
  ),
);
