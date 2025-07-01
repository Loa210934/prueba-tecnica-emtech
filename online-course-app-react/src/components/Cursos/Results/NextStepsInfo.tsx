import { Card } from 'antd';

export const NextStepsInfo = () => {
  return (
    <Card className='mt-8'>
      <Card.Meta title='¿Qué sigue?' />
      Pasos recomendados para continuar tu journey de aprendizaje
      <div className='grid md:grid-cols-3 gap-6 mt-2'>
        <div className='text-center'>
          <div className='bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3'>
            <span className='text-blue-600 font-bold'>1</span>
          </div>
          <h3 className='font-semibold mb-2'>Elige tu curso</h3>
          <p className='text-sm text-gray-600'>
            Selecciona uno de los cursos recomendados basado en tus resultados
          </p>
        </div>
        <div className='text-center'>
          <div className='bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3'>
            <span className='text-green-600 font-bold'>2</span>
          </div>
          <h3 className='font-semibold mb-2'>Únete a la comunidad</h3>
          <p className='text-sm text-gray-600'>
            Conecta con otros estudiantes y mentores en nuestro Discord
          </p>
        </div>
        <div className='text-center'>
          <div className='bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3'>
            <span className='text-purple-600 font-bold'>3</span>
          </div>
          <h3 className='font-semibold mb-2'>Comienza a aprender</h3>
          <p className='text-sm text-gray-600'>
            Inicia tu primer módulo y comienza tu transformación profesional
          </p>
        </div>
      </div>
    </Card>
  );
};
