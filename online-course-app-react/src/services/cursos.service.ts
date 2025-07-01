import type {
  CourseType,
  EnrolledCourseType,
} from '@/types/Courses/CourseType';
import api from './http';
import type { AssessmentGlobalResults } from '@/types/Courses/AssessmentsTypes';

const controller = 'course';
export const findById = (id: string): Promise<CourseType> =>
  api.get<CourseType>(`/${controller}/${id}`).then(r => r.data);

export const findMineSvc = (): Promise<EnrolledCourseType[]> =>
  api.get<EnrolledCourseType[]>(`/${controller}/mine`).then(r => r.data);

export const findAllSvc = (): Promise<CourseType[]> =>
  api.get<CourseType[]>(`/${controller}/list`).then(r => r.data);

export const saveAnswers = (
  payload: AssessmentGlobalResults,
): Promise<AssessmentGlobalResults> =>
  api
    .post<{ msg: string; data: AssessmentGlobalResults }>(
      `/${controller}/eval`,
      payload,
    )
    .then(r => r.data.data);
