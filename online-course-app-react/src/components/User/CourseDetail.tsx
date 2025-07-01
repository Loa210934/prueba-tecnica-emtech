import type { EnrolledCourseType } from '@/types/Courses/CourseType';
import { Button, Card, Image, Progress, Tag } from 'antd';
import { CheckCircle, Play, Star, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Props = {
  enrolledCourses: EnrolledCourseType[];
};

export const CourseDetail = ({ enrolledCourses }: Props) => {
  const navigator = useNavigate();

  const inProgressCourses = enrolledCourses.filter(
    course => course.status === 'En progreso',
  );
  const completedCourses = enrolledCourses.filter(
    course => course.status === 'Completado',
  );

  const handleClick = (courseId: string) => {
    navigator('/cursos/' + courseId);
  };
  return (
    <>
      {/* En Progreso */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>
          Cursos en Progreso
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {inProgressCourses.map(course => (
            <Card
              key={course._id}
              className='overflow-hidden'
              hoverable
              onClick={() => {
                handleClick(course._id);
              }}>
              <div className='flex items-center'>
                <Image
                  src={course.image || '/placeholder.svg'}
                  alt={course.title}
                  width={120}
                  className='object-cover'
                />
                <div className='flex-1 p-4'>
                  <div className='flex justify-between items-start mb-2'>
                    <h3 className='font-semibold text-sm line-clamp-2'>
                      {course.title}
                    </h3>
                    <Tag color='blue'>{course.category}</Tag>
                  </div>
                  <p className='text-xs text-gray-600 mb-2'>
                    por {course.instructor}
                  </p>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between mb-1'>
                      <div className='block text-xs text-gray-500'>
                        <span className='w-full'>
                          Progreso: {course.completedLessons}/{course.lessons}{' '}
                          lecciones
                        </span>
                      </div>
                      <Progress percent={course.progress} />
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                      <span className='text-xs text-gray-500'>
                        {course.lastAccessed}
                      </span>
                      <Button size='small' variant='outlined'>
                        <div className='flex items-center'>
                          <Play className='h-3 w-3 mr-1' />
                          <span> Continuar</span>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Completados */}
      <div>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>
          Cursos Completados
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {completedCourses.map(course => (
            <Card key={course._id} className='overflow-hidden' hoverable>
              <div className='flex items-center'>
                <Image
                  src={course.image || '/placeholder.svg'}
                  alt={course.title}
                  width={120}
                  className='object-cover'
                />
                <div className='flex-1 p-4'>
                  <div className='flex justify-between items-start'>
                    <h3 className='font-semibold text-sm'>{course.title}</h3>
                    <Tag color='green'>
                      <div className='flex items-center'>
                        <CheckCircle className='h-3 w-3 mr-1' />
                        <span>Completado</span>
                      </div>
                    </Tag>
                  </div>
                  <p className='text-xs text-gray-600 mb-1'>
                    por {course.instructor}
                  </p>

                  <div className='space-y-1'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center text-xs text-gray-500'>
                        <Star className='h-3 w-3 fill-yellow-400 text-yellow-400 mr-1' />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-xs text-gray-500'>
                        {course.lastAccessed}
                      </span>
                      <Button
                        size='small'
                        variant='outlined'
                        className='h-7 text-xs bg-transparent'>
                        <Trophy className='h-3 w-3 mr-1' />
                        Ver Certificado
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
