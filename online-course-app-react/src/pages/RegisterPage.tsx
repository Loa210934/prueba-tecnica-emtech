import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { Card, Steps } from 'antd';
import { SignInForm } from '@/components/auth/RegisterForm';
import { useState } from 'react';
import { PersonalDataForm } from '@/components/auth/PersonalDataForm';
import type { RegisterDto } from '@/types/Auth/ApiDto';

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<RegisterDto>({
    email: '',
    password: '',
    name: '',
    lastName: '',
    age: 0,
  });

  const handleNextStep = () => {
    if (step === 0) {
      setStep(1);
    } else {
      setStep(0);
    }
  };
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12'>
      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <Link
            to='/'
            className='inline-flex items-center text-blue-600 hover:text-blue-800 mb-4'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Volver al inicio
          </Link>
          <div className='flex items-center mb-4'>
            <BookOpen className='h-8 w-8 text-blue-600' />
            <span className='ml-2 text-2xl font-bold text-gray-900'>
              EduTech Open
            </span>
          </div>
        </div>
        <Card>
          <Card.Meta title='Registro de Estudiante' />
          <div className='my-8'>
            Completa tu información para acceder y descubrir los cursos
            perfectos para ti.
          </div>
          <Steps
            size='small'
            current={step}
            items={[
              {
                title: 'Registro de Usuario',
              },
              {
                title: 'Información Personal',
              },
            ]}
          />
          {step === 0 ? (
            <SignInForm handleStep={handleNextStep} setUserData={setUserData} />
          ) : (
            <PersonalDataForm userData={userData} />
          )}
        </Card>
      </div>
    </div>
  );
}
