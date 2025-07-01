import { formatTime } from '@/utils/Date/FormatTime';

type Props = {
  questions: { id: number }[];
  answeredQuestions: number;
  progress: number;
  timeLeft: number;
};

export const ProgressSummary = ({
  answeredQuestions,
  progress,
  questions,
  timeLeft,
}: Props) => {
  return (
    <div className='mt-8 bg-white rounded-lg p-6 shadow-sm'>
      <h3 className='font-semibold text-gray-900 mb-4'>
        Resumen del Assessment
      </h3>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
        <div>
          <div className='text-2xl font-bold text-blue-600'>
            {answeredQuestions}
          </div>
          <div className='text-sm text-gray-600'>Respondidas</div>
        </div>
        <div>
          <div className='text-2xl font-bold text-gray-400'>
            {questions.length - answeredQuestions}
          </div>
          <div className='text-sm text-gray-600'>Pendientes</div>
        </div>
        <div>
          <div className='text-2xl font-bold text-green-600'>
            {Math.round(progress)}%
          </div>
          <div className='text-sm text-gray-600'>Completado</div>
        </div>
        <div>
          <div className='text-2xl font-bold text-orange-600'>
            {formatTime(timeLeft)}
          </div>
          <div className='text-sm text-gray-600'>Tiempo restante</div>
        </div>
      </div>
    </div>
  );
};
