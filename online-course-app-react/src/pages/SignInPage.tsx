import { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useAuthStore } from '@/stores/Auth.store';
import { useNavigate } from 'react-router-dom';
import { loginService } from '@/services/auth.service';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const r = await loginService(values.email, values.password);
      console.log(r);
      login(r, r.token);
      localStorage.setItem('token', r.token);
      message.success('Inicio de sesión exitoso');
      navigate('/perfil');
    } catch {
      message.error('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }

    // setTimeout(() => {
    //   setLoading(false);
    //   if (
    //     values.email === 'user@example.com' &&
    //     values.password === 'password'
    //   ) {
    //     // Simulate successful login
    //     const user = {
    //       id: '1',
    //       name: 'Usuario',
    //       email: values.email,
    //     };
    //     login(user, 'fake-token');
    //     message.success('Inicio de sesión exitoso');
    //     navigate('/');
    //     return
    //   } else {
    //     message.error('Credenciales incorrectas');
    //   }
    // }, 1500);
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50 px-4'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Iniciar sesión</h2>

        <Form
          name='login'
          layout='vertical'
          onFinish={onFinish}
          autoComplete='off'>
          <Form.Item
            label='Correo electrónico'
            name='email'
            rules={[
              { required: true, message: 'Por favor ingresa tu correo' },
              { type: 'email', message: 'Ingresa un correo válido' },
            ]}>
            <Input placeholder='correo@ejemplo.com' />
          </Form.Item>

          <Form.Item
            label='Contraseña'
            name='password'
            rules={[
              { required: true, message: 'Por favor ingresa tu contraseña' },
            ]}>
            <Input.Password placeholder='Contraseña' />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              loading={loading}
              className='w-full'>
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
