import { Outlet } from 'react-router-dom';
import { Header } from '@/components/common/Header';
import { FooterComponent } from '@/components/common/FooterComponent';

export const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
};
