import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock } from 'lucide-react';
import { questions } from '@/Constants/Questions';
import { Progress } from 'antd';
import { useAuthStore } from '@/stores/Auth.store';
import { formatTime } from '@/utils/Date/FormatTime';
import { ProgressSummary } from '@/components/Cursos/Assessments/ProgressSummary';
import { QuestionNavigation } from '@/components/Cursos/Assessments/QuestionNavigation';
import { QuestionCard } from '@/components/Cursos/Assessments/QuestionCard';
import { useCourseAssessmentStore } from '@/stores/CourseAssessment.store';
import type { AssessmentGlobalResults } from '@/types/Courses/AssessmentsTypes';
import { saveAnswers } from '@/services/cursos.service';

export default function AssessmentPage() {
  const navigate = useNavigate();
  const { course, setAssessment } = useCourseAssessmentStore();
  const { user } = useAuthStore();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1),
  );
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos
  if (!user) {
    throw new Error('User not authenticated');
  }

  useEffect(() => {
    // Timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleAnswerChange = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    let correctAnswers = 0;
    const results = questions.map((question, index) => {
      const isCorrect = answers[index] === question.correct;
      if (isCorrect) correctAnswers++;
      return {
        question: question.question,
        selectedAnswer:
          answers[index] !== -1
            ? question.options[answers[index]]
            : 'Sin respuesta',
        correctAnswer: question.options[question.correct],
        isCorrect,
        category: question.category,
      };
    });

    const score = Math.round((correctAnswers / questions.length) * 100);
    // Guardar resultados
    const assessmentResults: AssessmentGlobalResults = {
      courseId: course?._id || 'unknown',
      answers,
      results,
      score,
      correctAnswers,
      totalQuestions: questions.length,
      completedAt: new Date().toISOString(),
    };
    try {
      await saveAnswers(assessmentResults);
      setAssessment(assessmentResults);
      navigate('results');
    } catch (error) {
      console.error('Error saving assessment results:', error);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredQuestions = answers.filter(answer => answer !== -1).length;

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <BookOpen className='h-8 w-8 text-blue-600' />
              <span className='ml-2 text-2xl font-bold text-gray-900'>
                EduTech Open | {course?.title}
              </span>
            </div>
            <div className='flex items-center text-lg font-semibold text-gray-700'>
              <Clock className='h-5 w-5 mr-2' />
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-sm font-medium text-gray-600'>
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className='text-sm text-gray-600'>
                {answeredQuestions} respondidas
              </span>
            </div>
            <Progress percent={progress} className='h-2' />
          </div>
        </div>

        <QuestionCard
          questionIndex={currentQuestion}
          questionData={questions[currentQuestion]}
          selectedAnswer={answers[currentQuestion]}
          onAnswerChange={handleAnswerChange}
        />

        <QuestionNavigation
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          answers={answers}
          onSelectQuestion={setCurrentQuestion}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
        {/* Progress Summary */}
        <ProgressSummary
          answeredQuestions={answeredQuestions}
          progress={progress}
          questions={questions}
          timeLeft={timeLeft}
        />
      </div>
    </div>
  );
}
