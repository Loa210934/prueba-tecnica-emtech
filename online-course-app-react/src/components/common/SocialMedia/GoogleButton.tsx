import { useNotification } from '@/hooks/useNotification';
import { Button } from 'antd';

export const GoogleButton = () => {
  const { contextHolder, openNotification } = useNotification();

  return (
    <>
      {contextHolder}

      <Button
        type='default'
        className='w-full flex items-center justify-center gap-2'
        icon={
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <path
              d='M19.805 10.23c0-.68-.06-1.36-.18-2.02H10v3.83h5.5a4.71 4.71 0 0 1-2.04 3.09v2.56h3.3c1.93-1.78 3.05-4.4 3.05-7.46z'
              fill='#4285F4'
            />
            <path
              d='M10 20c2.7 0 4.97-.89 6.63-2.41l-3.3-2.56c-.92.62-2.1.99-3.33.99-2.56 0-4.73-1.73-5.5-4.07H1.1v2.6A9.99 9.99 0 0 0 10 20z'
              fill='#34A853'
            />
            <path
              d='M4.5 12.95A5.99 5.99 0 0 1 4.1 10c0-.99.18-1.95.4-2.95V4.45H1.1A10.01 10.01 0 0 0 0 10c0 1.64.39 3.19 1.1 4.55l3.4-2.6z'
              fill='#FBBC05'
            />
            <path
              d='M10 3.96c1.47 0 2.8.51 3.84 1.5l2.88-2.88C14.97.89 12.7 0 10 0A9.99 9.99 0 0 0 1.1 4.45l3.4 2.6C5.27 5.69 7.44 3.96 10 3.96z'
              fill='#EA4335'
            />
          </svg>
        }
        onClick={() => openNotification()}>
        Iniciar sesión con Google
      </Button>
    </>
  );
};
