import { BookOpen } from 'lucide-react';

export const FooterComponent = () => {
  return (
    <footer className='bg-gray-900 text-white py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-4 gap-8'>
          <div>
            <div className='flex items-center mb-4'>
              <BookOpen className='h-6 w-6 text-blue-400' />
              <span className='ml-2 text-xl font-bold'>EduTech Open</span>
            </div>
            <p className='text-gray-400'>
              Plataforma open source de educación tecnológica gratuita para
              todos.
            </p>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Cursos</h3>
            <ul className='space-y-2 text-gray-400'>
              <li>Programación Web</li>
              <li>Ciencia de Datos</li>
              <li>DevOps</li>
              <li>Machine Learning</li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Recursos</h3>
            <ul className='space-y-2 text-gray-400'>
              <li>Assessment</li>
              <li>Certificaciones</li>
              <li>Comunidad</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Contacto</h3>
            <ul className='space-y-2 text-gray-400'>
              <li>GitHub</li>
              <li>Discord</li>
              <li>Twitter</li>
              <li>Email</li>
            </ul>
          </div>
        </div>
        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>&copy; 2025 Uriel Isaac Vazquez. Prueba técnica para EmTech.</p>
        </div>
      </div>
    </footer>
  );
};
