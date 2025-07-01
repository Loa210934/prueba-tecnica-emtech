import { useNotification } from '@/hooks/useNotification';
import { Button } from 'antd';

export const GitHubSignInButton = () => {
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
              d='M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.11-4.555-4.943 0-1.09.39-1.982 1.029-2.68-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 10 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.698 1.028 1.59 1.028 2.68 0 3.842-2.338 4.687-4.566 4.936.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C17.138 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z'
              fill='#333'
            />
          </svg>
        }
        onClick={() => openNotification()}>
        Iniciar sesión con GitHub
      </Button>
    </>
  );
};
