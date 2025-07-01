import { useEffect, useState } from 'react';
import { BookOpen, User, Award, TrendingUp } from 'lucide-react';
import { UserSummary } from '@/components/User/UserSummary';
import { CourseDetail } from '@/components/User/CourseDetail';
import { Empty, Skeleton, Tabs } from 'antd';
import { useCourseAssessmentStore } from '@/stores/CourseAssessment.store';
import { findMineSvc } from '@/services/cursos.service';
import type { EnrolledCourseType } from '@/types/Courses/CourseType';

export default function ProfilePage() {
  const { clear } = useCourseAssessmentStore();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourseType[]>(
    [],
  );

  const [activeTab, setActiveTab] = useState('courses');

  useEffect(() => {
    clear();
  }, []);

  useEffect(() => {
    findMineSvc().then(courses => {
      setEnrolledCourses(courses);
    });
  }, []);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <UserSummary />
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className='space-y-6'
          tabBarGutter={16}
          items={[
            {
              key: 'courses',
              label: (
                <span className='flex items-center gap-2'>
                  <BookOpen className='h-4 w-4' />
                  Mis Cursos
                </span>
              ),
            },
            {
              key: 'progress',
              label: (
                <span className='flex items-center gap-2'>
                  <TrendingUp className='h-4 w-4' />
                  Progreso
                </span>
              ),
            },
            {
              key: 'certificates',
              label: (
                <span className='flex items-center gap-2'>
                  <Award className='h-4 w-4' />
                  Certificados
                </span>
              ),
            },
            {
              key: 'settings',
              label: (
                <span className='flex items-center gap-2'>
                  <User className='h-4 w-4' />
                  Perfil
                </span>
              ),
            },
          ]}
        />
        {/* Courses Tab */}
        {enrolledCourses.length > 0 ? (
          <CourseDetail enrolledCourses={enrolledCourses} />
        ) : enrolledCourses.length == 0 ? (
          <Empty description='No tienes cursos registrados' />
        ) : (
          <Skeleton active paragraph={{ rows: 4 }} />
        )}

        {/* Progreso Tab */}

        {/* Certificados Tab */}

        {/* Configuración Tab */}
      </div>
    </div>
  );
}
