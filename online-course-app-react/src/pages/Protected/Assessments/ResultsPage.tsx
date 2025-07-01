import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'antd';
import { Download } from 'lucide-react';

import { ScoreSummaryCard } from '@/components/Cursos/Results/ScoreSummaryCard';
import { DetailedQuestions } from '@/components/Cursos/Results/DetailedQuestions';
import { courseRecommendations } from '@/Constants/Courses';
import { NextStepsInfo } from '@/components/Cursos/Results/NextStepsInfo';
import { useCourseAssessmentStore } from '@/stores/CourseAssessment.store';

import type { MinimalCourseDisplay } from '@/types/Courses/CourseType';
import { generateAssessmentPDF } from '@/utils/PDF/generateAssessmentPDF';

export default function ResultsPage() {
  const { course, assessment } = useCourseAssessmentStore();
  const [recommendations, setRecommendations] = useState<
    MinimalCourseDisplay[]
  >([]);

  useEffect(() => {
    setTimeout(() => {
      setRecommendations(courseRecommendations);
    }, 500);
  }, []);

  const downloadPDF = async () => {
    if (!assessment || !recommendations) return;
    if (!assessment || !recommendations || !course) return;
    await generateAssessmentPDF({
      courseTitle: course.title,
      assessment,
      recommendations,
    });
  };

  if (!assessment) {
    return <div>Cargando resultados...</div>;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <div className='flex items-center justify-center mb-4'>
            <span className='ml-2 text-2xl font-bold text-gray-900'>
              {course?.title}
            </span>
          </div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            ¡Evaluación Completada!
          </h1>
          <p className='text-lg text-gray-600'>
            Aquí están tus resultados y recomendaciones personalizadas
          </p>
        </div>
        <ScoreSummaryCard results={assessment} />
        <DetailedQuestions
          recommendations={recommendations}
          results={assessment}
        />

        {/* Action Buttons */}
        <div className='my-6 flex flex-col sm:flex-row gap-4 justify-center'>
          <Button
            onClick={downloadPDF}
            size='large'
            variant='solid'
            color='red'
            className='flex items-center'>
            <Download className='h-5 w-5 mr-2' />
            Descargar Reporte PDF
          </Button>
          <Link to='/perfil' replace>
            <Button variant='outlined' size='large'>
              Volver al Inicio
            </Button>
          </Link>
          <Link to='/cursos' replace>
            <Button variant='solid' color='blue' size='large'>
              Explorar Todos los Cursos
            </Button>
          </Link>
        </div>
        <NextStepsInfo />
      </div>
    </div>
  );
}
