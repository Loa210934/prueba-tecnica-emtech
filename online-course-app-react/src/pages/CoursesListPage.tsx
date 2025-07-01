import { EmptyComponent } from '@/components/common/EmptyComponents';
import { FooterComponent } from '@/components/common/FooterComponent';
import { Input, Select, Row, Col, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { CourseComponentDisplay } from '@/components/Cursos/CourseComponentPublic';
import type { CourseType } from '@/types/Courses/CourseType';
import { findAllSvc } from '@/services/cursos.service';

const { Option } = Select;
const { Title, Paragraph, Text } = Typography;

const categories = [
  'Todas',
  'Desarrollo Web',
  'Diseño',
  'Data Science',
  'Marketing',
  'Desarrollo Móvil',
  'Fotografía',
];
const levels = ['Todos', 'Principiante', 'Intermedio', 'Avanzado'];

export default function CoursesListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedLevel, setSelectedLevel] = useState('Todos');
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    findAllSvc()
      .then(courses => {
        setCourses(courses);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Todas' || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === 'Todos' || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className='bg-gray-100'>
      <section
        style={{
          background: 'linear-gradient(to right, #2563eb, #9333ea)',
          color: 'white',
          padding: '64px 0',
        }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            textAlign: 'center',
            padding: '0 16px',
          }}>
          <Title
            style={{ color: 'white', marginBottom: 16, fontWeight: 700 }}
            level={1}>
            Aprende Nuevas Habilidades
          </Title>
          <Paragraph
            style={{ color: '#dbeafe', fontSize: 20, marginBottom: 32 }}>
            Descubre miles de cursos online de los mejores instructores
          </Paragraph>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <Input
              size='large'
              placeholder='¿Qué quieres aprender hoy?'
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ background: 'white', color: '#111827' }}
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section
        style={{
          background: 'white',
          borderBottom: '1px solid #f0f0f0',
          padding: '24px 0',
        }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <Row gutter={[16, 16]} align='middle' justify='space-between'>
            <Col>
              <Text strong style={{ color: '#374151' }}>
                Filtrar por:
              </Text>
            </Col>
            <Col>
              <Row gutter={16}>
                <Col>
                  <Select
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    style={{ width: 180 }}>
                    {categories.map(category => (
                      <Option key={category} value={category}>
                        {category}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col>
                  <Select
                    value={selectedLevel}
                    onChange={setSelectedLevel}
                    style={{ width: 180 }}>
                    {levels.map(level => (
                      <Option key={level} value={level}>
                        {level}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </section>

      {/* Courses Grid */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 16px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 32,
          }}>
          <Title level={2} style={{ margin: 0, color: '#111827' }}>
            {filteredCourses.length} cursos encontrados
          </Title>
        </div>

        <Row gutter={[32, 32]}>
          {filteredCourses.map(course => (
            <Col xs={24} md={12} lg={8} key={course._id}>
              <CourseComponentDisplay course={course} />
            </Col>
          ))}
        </Row>

        {filteredCourses.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48 }}>
            <EmptyComponent message='No se encontraron cursos' />
          </div>
        )}
      </main>
      <FooterComponent />
    </div>
  );
}
