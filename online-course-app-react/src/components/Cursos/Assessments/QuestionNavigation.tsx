import { Button } from 'antd';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type QuestionNavigationProps = {
  currentQuestion: number;
  totalQuestions: number;
  answers: number[];
  onSelectQuestion: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

export const QuestionNavigation = ({
  currentQuestion,
  totalQuestions,
  answers,
  onSelectQuestion,
  onPrevious,
  onNext,
  onSubmit,
}: QuestionNavigationProps) => {
  const answeredQuestions = answers.filter(a => a !== -1).length;

  return (
    <div className='flex justify-between items-center mt-4'>
      <Button
        variant='outlined'
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className='flex items-center bg-transparent'>
        <ArrowLeft className='h-4 w-4 mr-2' />
        Anterior
      </Button>

      <div className='flex space-x-2'>
        {Array.from({ length: totalQuestions }, (_, index) => (
          <button
            key={index}
            onClick={() => onSelectQuestion(index)}
            className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
              index === currentQuestion
                ? 'bg-blue-600 text-white'
                : answers[index] !== -1
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-200 text-gray-600'
            }`}>
            {index + 1}
          </button>
        ))}
      </div>

      {currentQuestion === totalQuestions - 1 ? (
        <Button onClick={onSubmit} className='flex items-center'>
          Finalizar Assessment
        </Button>
      ) : (
        <Button onClick={onNext} className='flex items-center'>
          Siguiente
          <ArrowRight className='h-4 w-4 ml-2' />
        </Button>
      )}
    </div>
  );
};
