import { useNotification } from '@/hooks/useNotification';
import type { MinimalCourseDisplay } from '@/types/Courses/CourseType';
import { Button, Card, Tag } from 'antd';
import { ArrowRight } from 'lucide-react';

type Props = {
  course: MinimalCourseDisplay;
  showDetails?: boolean;
};

export const CourseMinimalPublic = ({ course, showDetails = true }: Props) => {
  const { contextHolder, openNotification } = useNotification();

  return (
    <>
      <div className='p-1'>
        {contextHolder}
        <Card
          hoverable
          key={course.id}
          size='small'
          type='inner'
          style={showDetails ? { border: '1px solid #4f4f4f' } : undefined}>
          <div className='flex items-start justify-between mb-2'>
            <h3 className='font-semibold text-lg'>{course.title}</h3>
            <Tag>{course.level}</Tag>
          </div>
          <p className='text-gray-600 text-sm mb-3'>{course.description}</p>
          <div className='flex items-center justify-between text-sm text-gray-500 mb-3'>
            <span>Duración: {course.duration}</span>
            <div className='flex gap-1'>
              <Tag className='text-xs'>{course.category}</Tag>
            </div>
          </div>
          {showDetails && (
            <>
              <div className='mb-3'>
                <p className='text-sm font-medium text-gray-700 mb-1'>
                  Temas incluidos:
                </p>
                <div className='flex flex-wrap gap-1'>
                  {course.tags.slice(0, 3).map((topic: string) => (
                    <span
                      key={topic}
                      className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded'>
                      {topic}
                    </span>
                  ))}
                  {course.tags.length > 3 && (
                    <span className='text-xs text-gray-500'>
                      +{course.tags.length - 3} más
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant='solid'
                color='blue'
                size='small'
                className='w-full'
                onClick={() => {
                  openNotification();
                }}>
                Ver Curso Completo
                <ArrowRight className='h-4 w-4 ml-2' />
              </Button>
            </>
          )}
        </Card>
      </div>
    </>
  );
};
