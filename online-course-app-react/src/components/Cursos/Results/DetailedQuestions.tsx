import { Card, Tag } from 'antd';
import { CheckCircle, XCircle } from 'lucide-react';
import { CourseMinimalPublic } from '../CourseMinimalPublic';
import type { MinimalCourseDisplay } from '@/types/Courses/CourseType';
import type { AssessmentGlobalResults } from '@/types/Courses/AssessmentsTypes';

type Props = {
  results: AssessmentGlobalResults;
  recommendations: MinimalCourseDisplay[];
};

export const DetailedQuestions = ({ results, recommendations }: Props) => {
  return (
    <div className='grid lg:grid-cols-2 gap-8'>
      {/* Detailed Results */}
      <Card>
        <div className='mb-5'>
          <span className='text-lg text-center font-bold '>
            Revisa tus respuestas pregunta por pregunta
          </span>
        </div>
        {results.results.map((result, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border my-1 ${
              result.isCorrect
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}>
            <div className='flex items-start justify-between mb-2'>
              <div className='flex items-center'>
                {result.isCorrect ? (
                  <CheckCircle className='h-5 w-5 text-green-500 mr-2' />
                ) : (
                  <XCircle className='h-5 w-5 text-red-500 mr-2' />
                )}
                <span className='font-medium'>Pregunta {index + 1}</span>
              </div>
              <Tag>{result.category}</Tag>
            </div>
            <p className='text-sm text-gray-700 mb-2'>{result.question}</p>
            <div className='text-sm'>
              <p
                className={
                  result.isCorrect ? 'text-green-700' : 'text-red-700'
                }>
                <strong>Tu respuesta:</strong> {result.selectedAnswer}
              </p>
              {!result.isCorrect && (
                <p className='text-green-700'>
                  <strong>Respuesta correcta:</strong> {result.correctAnswer}
                </p>
              )}
            </div>
          </div>
        ))}
      </Card>

      {/* Course Recommendations */}
      <Card>
        <Card.Meta title='Cursos Recomendados' />
        <div className='my-5'>
          <span className='text-center font-bold '>
            Basado en tu desempeño, estos cursos son perfectos para ti
          </span>
        </div>
        {recommendations.map(course => (
          <CourseMinimalPublic course={course} key={course.id} />
        ))}
      </Card>
    </div>
  );
};
