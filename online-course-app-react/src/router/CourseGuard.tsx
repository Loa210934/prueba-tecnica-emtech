import { useCourseAssessmentStore } from '@/stores/CourseAssessment.store';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const CourseGuard = ({ children }: { children: ReactNode }) => {
  const { course } = useCourseAssessmentStore();
  return !!course ? <>{children}</> : <Navigate to='/perfil' replace />;
};
