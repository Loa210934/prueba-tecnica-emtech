import { Link } from 'react-router-dom';
import { Button, Card } from 'antd';
import { Award, BookOpen, Users } from 'lucide-react';
import { CourseMinimalPublic } from '@/components/Cursos/CourseMinimalPublic';
import { courses, toMinimalCourseDisplay } from '@/Constants/Courses';

export default function HomePage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      {/* Hero Section */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
            Aprende Tecnología
            <span className='text-blue-600'> Gratis</span>
          </h1>
          <p className='text-xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            Plataforma open source de cursos tecnológicos y científicos. Realiza
            nuestro assessment personalizado y descubre los cursos perfectos
            para tu nivel de conocimiento.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link to='/registro'>
              <Button variant='solid' color='default'>
                Regístrate
              </Button>
            </Link>
            <Link to='#courses'>
              <Button variant='outlined'>Ver Cursos Disponibles</Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id='features' className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              ¿Por qué elegir EduTech Open?
            </h2>
            <p className='text-xl text-gray-600'>
              Una plataforma diseñada para tu crecimiento profesional
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <Card
              variant='outlined'
              style={{ border: '0.05px solid #99a1af  ' }}
              className='text-center'
              cover={
                <BookOpen className='h-12 w-12 text-blue-600 mx-auto mt-8' />
              }>
              <Card.Meta title='Assessment Personalizado' />
              <div className='my-4 text-gray-600 break-words'>
                Evaluamos tu nivel actual con un cuestionario de 10 preguntas
                para recomendarte los cursos más adecuados para ti.
              </div>
            </Card>

            <Card
              variant='outlined'
              style={{ border: '0.05px solid #99a1af  ' }}
              className='text-center'
              cover={
                <Users className='h-12 w-12 text-green-600 mx-auto mt-8' />
              }>
              <Card.Meta title='100% Gratuito' />
              <div className='my-4 text-gray-600 break-words'>
                Todos nuestros cursos son completamente gratuitos y de código
                abierto. Educación accesible para todos.
              </div>
            </Card>

            <Card
              variant='outlined'
              style={{ border: '0.05px solid #99a1af  ' }}
              className='text-center'
              cover={
                <Award className='h-12 w-12 text-purple-600 mx-auto mt-8 ' />
              }>
              <Card.Meta title='Certificaciones' />
              <div className='my-4 text-gray-600 break-words'>
                Obtén certificados al completar los cursos y descarga reportes
                detallados de tu progreso en formato PDF.
              </div>
            </Card>
          </div>
        </div>
      </section>
      {/* Courses Preview */}
      <section id='courses' className='py-20 bg-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              <Link to='/cursos'>
                <span className='text-blue-600 '>Cursos&nbsp;</span>
                Disponibles
              </Link>
            </h2>
            <p className='text-xl text-gray-600'>
              Programas de capacitación tecnológica y científica
            </p>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {courses.map(course => (
              <CourseMinimalPublic
                showDetails={false}
                course={toMinimalCourseDisplay(course)}
                key={course._id}
              />
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className='py-20 bg-blue-600'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl font-bold text-white mb-4'>
            ¿Listo para comenzar tu journey tecnológico?
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Realiza nuestro assessment y descubre qué cursos son perfectos para
            ti
          </p>
          <Link to='/register'>
            <Button
              className='text-lg px-8 py-3'
              variant='solid'
              color='default'>
              Regístrate
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
