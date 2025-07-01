import { Card, Radio } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

type QuestionCardProps = {
  questionIndex: number;
  questionData: {
    question: string;
    options: string[];
    category: string;
  };
  selectedAnswer: number;
  onAnswerChange: (value: number) => void;
};

export const QuestionCard = ({
  questionIndex,
  questionData,
  selectedAnswer,
  onAnswerChange,
}: QuestionCardProps) => {
  return (
    <Card className='mb-8'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-2xl font-bold'>Pregunta {questionIndex + 1}:</h3>
        <div className='flex text-left'>
          <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
            {questionData.category}
          </span>
        </div>
      </div>
      <Paragraph strong>{questionData.question}</Paragraph>
      <Radio.Group
        value={selectedAnswer}
        onChange={e => onAnswerChange(e.target.value)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          paddingLeft: 8,
        }}
        options={questionData.options.map((option, index) => ({
          label: option,
          value: index,
        }))}
      />
    </Card>
  );
};
