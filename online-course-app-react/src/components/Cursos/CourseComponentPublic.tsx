import type { CourseType } from '@/types/Courses/CourseType';
import { Button, Card, Image, Skeleton, Tag } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { Clock, Play, StarIcon, User } from 'lucide-react';

type Props = {
  course: CourseType;
};

export const CourseComponentDisplay = ({ course }: Props) => {
  return (
    <Card
      hoverable
      cover={
        <div className='flex flex-col'>
          <div className='bg-gray-300 w-full flex justify-center items-center'>
            {course.image ? (
              <Image
                loading='lazy'
                src={course.image}
                alt={course.title}
                className='w-full'
                style={{ objectFit: 'contain' }}
                preview={false}
              />
            ) : (
              <Skeleton.Image active />
            )}
          </div>
          <div className='flex justify-end mt-2'>
            <Tag color='#108ee9'>{course.category}</Tag>
            <Tag color='default'>{course.level}</Tag>
          </div>
        </div>
      }>
      <Title level={4} ellipsis={{ rows: 2 }}>
        {course.title}
      </Title>
      <Paragraph ellipsis={{ rows: 2 }} style={{ color: '#6b7280' }}>
        {course.description}
      </Paragraph>
      <div className='flex justify-between items-center mb-5 '>
        <span className='flex items-center gap-1'>
          <User /> {course.instructor}
        </span>
        <span className='flex items-center gap-1'>
          <StarIcon style={{ color: '#facc15' }} /> {course.rating}
        </span>
      </div>
      <div className='flex justify-between items-center mb-5 '>
        <span className='flex items-center gap-1'>
          <User /> {course.students.toLocaleString()} estudiantes
        </span>
        <span className='flex items-center gap-1'>
          <Clock style={{ marginRight: 4 }} /> {course.duration}
        </span>
      </div>
      <div
        className='flex items-center mb-5'
        style={{
          color: '#6b7280',
        }}>
        <Play style={{ marginRight: 4 }} /> {course.lessons} lecciones
      </div>
      <div style={{ marginBottom: 12 }}>
        {course.tags.slice(0, 3).map(tag => (
          <Tag
            key={tag}
            color='default'
            style={{
              background: '#e0e7ff',
              color: '#3730a3',
              marginRight: 4,
            }}>
            {tag}
          </Tag>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 12,
        }}>
        <span
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#16a34a',
            marginRight: 8,
          }}>
          ${course.price}
        </span>
        <span
          style={{
            textDecoration: 'line-through',
            color: '#6b7280',
          }}>
          ${course.originalPrice}
        </span>
      </div>
      <Button type='primary' block>
        Ver Curso
      </Button>
    </Card>
  );
};
