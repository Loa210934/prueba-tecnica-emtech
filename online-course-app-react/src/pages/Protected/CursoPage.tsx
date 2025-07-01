import { findById } from '@/services/cursos.service';
import { useCourseAssessmentStore } from '@/stores/CourseAssessment.store';
import type { CourseType } from '@/types/Courses/CourseType';
import { Button, Card, Input, Skeleton, Tag } from 'antd';
import { Clock, Star, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const { TextArea } = Input;

const CourseOverview = () => {
  const { courseId } = useParams();
  const { setCourse } = useCourseAssessmentStore();

  const [courseData, setCourseData] = useState<CourseType | null>(null);
  useEffect(() => {
    findById(courseId!).then(c => {
      console.log(c);
      setCourseData(c);
      setCourse(c);
    });
  }, [courseId]);

  if (!courseId) {
    return <div>Error: Course ID not found</div>;
  }
  return (
    <>
      <>
        <div className='lg:col-span-3 space-y-6 max-w-4xl mx-auto mb-20 mt-10'>
          {/* Información del Curso */}
          <Card className='overflow-hidden'>
            {courseData ? (
              <>
                <Card.Meta title={courseData.title} />

                <div className='flex flex-col space-y-2 mt-1'>
                  <div className='flex justify-between items-start'>
                    <div>{courseData.description}</div>
                    <Tag>{courseData.level}</Tag>
                  </div>
                  <div className='flex items-center space-x-6 text-sm text-gray-600'>
                    <div className='flex items-center'>
                      <User className='h-4 w-4 mr-1' />
                      {courseData.instructor}
                    </div>
                    <div className='flex items-center'>
                      <Star className='h-4 w-4 mr-1 fill-yellow-400 text-yellow-400' />
                      {courseData.rating}
                    </div>
                    <div className='flex items-center'>
                      <Clock className='h-4 w-4 mr-1' />
                      {courseData.duration}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className='space-y-2 mt-1'>
                <Card.Meta
                  title={
                    <Skeleton.Input
                      active
                      style={{ width: 200, marginBottom: 20 }}
                    />
                  }
                  description={null}
                />
                <Skeleton active paragraph={{ rows: 2 }} title={false} />
                <div className='flex items-center space-x-6 text-sm text-gray-600'>
                  <Skeleton.Input active style={{ width: 100 }} />
                  <Skeleton.Input active style={{ width: 60 }} />
                  <Skeleton.Input active style={{ width: 80 }} />
                </div>
              </div>
            )}
          </Card>

          <Card className='max-w-4xl mx-auto mt-6  justify-center'>
            <div className='space-y-4'>
              <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                <h4 className='font-semibold text-blue-800 mb-2'>
                  Notas de la Lección
                </h4>
                <TextArea
                  placeholder='Escribe tus notas aquí...'
                  className='min-h-[100px] bg-white'
                />
              </div>
            </div>
          </Card>
          <div className='flex justify-center'>
            <Link to={`evaluacion`} replace>
              <Button variant='solid' color='blue'>
                Tomar Evaluación
              </Button>
            </Link>
          </div>
        </div>
      </>
    </>
  );
};

export default CourseOverview;
