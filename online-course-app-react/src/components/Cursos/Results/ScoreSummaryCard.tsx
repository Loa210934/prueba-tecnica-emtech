import type { AssessmentGlobalResults } from '@/types/Courses/AssessmentsTypes';
import { getScoreColor, getScoreMessage } from '@/utils/Results/GradeUtils';
import { Card } from 'antd';
import { CheckCircle, Target, Trophy, XCircle } from 'lucide-react';

type Props = {
  results: AssessmentGlobalResults;
};

export const ScoreSummaryCard = ({ results }: Props) => {
  return (
    <div className='my-5'>
      {/* Score Card */}
      <Card>
        <Card.Meta
          title={
            <span className={`${getScoreColor(results.score)} font-bold `}>
              {results.score}/100
            </span>
          }
        />

        <div className='flex items-center  flex-col justify-center my-5'>
          <Trophy className='h-12 w-12 text-yellow-500' />
          <span className='text-xl font-bold'>
            {getScoreMessage(results.score)}
          </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>
          <div className='flex flex-col items-center'>
            <CheckCircle className='h-8 w-8 text-green-500 mb-2' />
            <div className='text-2xl font-bold text-green-600'>
              {results.correctAnswers}
            </div>
            <div className='text-sm text-gray-600'>Respuestas Correctas</div>
          </div>
          <div className='flex flex-col items-center'>
            <XCircle className='h-8 w-8 text-red-500 mb-2' />
            <div className='text-2xl font-bold text-red-600'>
              {results.totalQuestions - results.correctAnswers}
            </div>
            <div className='text-sm text-gray-600'>Respuestas Incorrectas</div>
          </div>
          <div className='flex flex-col items-center'>
            <Target className='h-8 w-8 text-blue-500 mb-2' />
            <div className='text-2xl font-bold text-blue-600'>
              {Math.round(
                (results.correctAnswers / results.totalQuestions) * 100,
              )}
              %
            </div>
            <div className='text-sm text-gray-600'>Precisión</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
