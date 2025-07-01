import { Button, Card, Divider, Form, Input } from 'antd';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { GoogleButton } from '../common/SocialMedia/GoogleButton';
import { GitHubSignInButton } from '../common/SocialMedia/GitHubSignInButton';
import type { RegisterDto } from '@/types/Auth/ApiDto';

type Props = {
  handleStep: () => void;
  setUserData: Dispatch<SetStateAction<RegisterDto>>;
};
export const SignInForm = (props: Props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    props.setUserData({
      email: formData.email,
      password: formData.password,
      age: 0,
      name: '',
      lastName: '',
    });
    setIsSubmitting(true);
    props.handleStep();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <>
      <Card type='inner' style={{ marginTop: '1rem' }}>
        <Form
          layout='vertical'
          onFinish={handleSubmit}
          initialValues={formData}
          className='space-y-2'>
          <Form.Item
            label='Email'
            name='email'
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email}
            rules={[
              { required: true, message: 'El email es requerido' },
              { type: 'email', message: 'El email no es válido' },
            ]}>
            <Input
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
              placeholder='tu@email.com'
            />
          </Form.Item>
          <Form.Item
            label='Contraseña'
            name='password'
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password}
            rules={[{ required: true, message: 'La contraseña es requerida' }]}>
            <Input
              value={formData.password}
              onChange={e => handleInputChange('password', e.target.value)}
              type='password'
              placeholder='********'></Input>
          </Form.Item>
          <Form.Item>
            <div className='flex justify-center mt-2'>
              <Button
                variant='solid'
                color='blue'
                type='primary'
                disabled={isSubmitting}
                htmlType='submit'>
                {isSubmitting ? 'Registrando...' : 'Registrase'}
              </Button>
            </div>
          </Form.Item>
        </Form>
        <Divider />
        <div className='flex flex-col justify-center items-center gap-3 mb-4 max-w-xs mx-auto  '>
          <GoogleButton />
          <GitHubSignInButton />
        </div>
      </Card>
    </>
  );
};
