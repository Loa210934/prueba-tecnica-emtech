import { useNotification } from '@/hooks/useNotification';
import { registerSVC } from '@/services/auth.service';
import { findById } from '@/services/cursos.service';
import { useAuthStore } from '@/stores/Auth.store';
import { useCourseAssessmentStore } from '@/stores/CourseAssessment.store';
import type { RegisterDto } from '@/types/Auth/ApiDto';
import { Button, Card, Form, Input, Modal, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  userData: RegisterDto;
};

const assessmentId = '68632f4ef9062aec78934b25';
export const PersonalDataForm = ({ userData }: Props) => {
  const { login } = useAuthStore();
  const { setCourse } = useCourseAssessmentStore();
  const navigate = useNavigate();
  const { openNotification, contextHolder } = useNotification();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    education: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOk = () => {
    navigate(`/cursos/${assessmentId}/evaluacion`);
    setOpen(false);
  };
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }

    if (!formData.age.trim()) {
      newErrors.age = 'La edad es requerida';
    } else if (
      Number.parseInt(formData.age) < 16 ||
      Number.parseInt(formData.age) > 100
    ) {
      newErrors.age = 'La edad debe estar entre 16 y 100 años';
    }

    if (!formData.education) {
      newErrors.education = 'El nivel educativo es requerido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    const payload: RegisterDto = {
      email: userData.email,
      password: userData.password,
      name: formData.firstName,
      lastName: formData.lastName,
      age: Number(formData.age),
    };
    try {
      const r = await registerSVC(payload);
      login(r, r.token);
      const c = await findById(assessmentId);
      setCourse(c);
      setOpen(true);
    } catch (error) {
      openNotification('Error', 'Ocurrió un error al registrar tus datos.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        title='Se ha completado el registro'
        onOk={handleOk}
        footer={(_, { OkBtn }) => (
          <>
            <OkBtn />
          </>
        )}>
        <p>
          ¡Felicidades! Has completado tu registro exitosamente. Ahora puedes
          comenzar el assessment para descubrir los cursos que mejor se adaptan
          a tus necesidades.
        </p>
      </Modal>
      <Card type='inner' style={{ marginTop: '1rem' }}>
        <Form
          layout='vertical'
          onFinish={handleSubmit}
          initialValues={formData}
          className='space-y-2'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Form.Item
              label='Nombre'
              name='firstName'
              validateStatus={errors.firstName ? 'error' : ''}
              help={errors.firstName}
              rules={[{ required: true, message: 'El nombre es requerido' }]}>
              <Input
                value={formData.firstName}
                onChange={e => handleInputChange('firstName', e.target.value)}
                placeholder='Tu nombre'
              />
            </Form.Item>
            <Form.Item
              label='Apellido'
              name='lastName'
              validateStatus={errors.lastName ? 'error' : ''}
              help={errors.lastName}
              rules={[{ required: true, message: 'El apellido es requerido' }]}>
              <Input
                value={formData.lastName}
                onChange={e => handleInputChange('lastName', e.target.value)}
                placeholder='Tu apellido'
              />
            </Form.Item>
          </div>

          <Form.Item
            label='Edad'
            name='age'
            validateStatus={errors.age ? 'error' : ''}
            help={errors.age}
            rules={[
              { required: true, message: 'La edad es requerida' },
              {
                validator: (_, value) =>
                  !value || (Number(value) >= 16 && Number(value) <= 100)
                    ? Promise.resolve()
                    : Promise.reject('La edad debe estar entre 16 y 100 años'),
              },
            ]}>
            <Input
              type='number'
              value={formData.age}
              onChange={e => handleInputChange('age', e.target.value)}
              placeholder='25'
              min={16}
              max={100}
            />
          </Form.Item>

          {/* Información Académica */}
          <Form.Item
            label='Nivel Educativo *'
            name='education'
            validateStatus={errors.education ? 'error' : ''}
            help={errors.education}
            rules={[
              { required: true, message: 'El nivel educativo es requerido' },
            ]}>
            <Select
              value={formData.education || undefined}
              onChange={value => handleInputChange('education', value)}
              placeholder='Selecciona tu nivel educativo'>
              <Select.Option value='secundaria'>Secundaria</Select.Option>
              <Select.Option value='tecnico'>Técnico</Select.Option>
              <Select.Option value='universitario'>Universitario</Select.Option>
              <Select.Option value='posgrado'>Posgrado</Select.Option>
              <Select.Option value='autodidacta'>Autodidacta</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <div className='flex justify-center mt-4'>
              <Button
                variant='solid'
                color='blue'
                type='primary'
                disabled={isSubmitting}
                htmlType='submit'>
                {isSubmitting ? 'Registrando...' : 'Comenzar Assessment'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
