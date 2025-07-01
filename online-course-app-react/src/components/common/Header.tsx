import { useState } from 'react';
import { Menu, Drawer, Avatar, Dropdown, Button, message } from 'antd';
import type { MenuProps } from 'antd';
import {
  BookOpen,
  Menu as MenuIcon,
  PieChartIcon,
  LampDeskIcon,
  ContainerIcon,
  UserRound,
  LogOut,
  LogIn,
} from 'lucide-react';
import { useAuthStore } from '@/stores/Auth.store';
import { Link, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', icon: <PieChartIcon size={18} />, label: 'Características' },
  { key: '2', icon: <LampDeskIcon size={18} />, label: 'Cursos' },
  { key: '3', icon: <ContainerIcon size={18} />, label: 'Acerca de' },
];

export const Header = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const avatarMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserRound size={16} />,
      label: 'Mi perfil',
    },
    {
      key: 'logout',
      icon: isAuthenticated ? <LogOut size={16} /> : <LogIn size={16} />,
      label: isAuthenticated ? 'Cerrar sesión' : 'Iniciar sesión',
    },
  ];

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    const hashMap: Record<string, string> = {
      '1': '#features',
      '2': 'cursos',
    };
    const hash = hashMap[key];
    if (hash === '#features') {
      navigate('/#features');
    }
    if (hash === 'cursos') {
      navigate('/cursos');
    }
    setDrawerVisible(false);
  };

  const handleAvatarClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      message.success('Cierre de sesión exitoso');
      logout();
    } else if (key === 'profile') {
      navigate('/perfil');
    }
  };

  return (
    <>
      <header className='bg-white shadow-sm min-w-xs'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-4'>
            {/* Logo */}
            <Link to='/'>
              <div className='flex items-center'>
                <BookOpen className='h-8 w-8 text-blue-600' />
                <span className='ml-2 text-2xl font-bold text-gray-900'>
                  EduTech Open
                </span>
              </div>
            </Link>
            <div className='md:hidden flex items-center gap-2'>
              <Dropdown
                menu={{ items: avatarMenuItems, onClick: handleAvatarClick }}
                placement='bottomRight'
                arrow>
                <Avatar className='cursor-pointer bg-blue-600'>
                  {isAuthenticated ? 'U' : '?'}
                </Avatar>
              </Dropdown>
              <Button
                type='text'
                icon={<MenuIcon className='h-6 w-6' />}
                onClick={() => setDrawerVisible(true)}
              />
            </div>
            <div className='hidden md:flex items-center gap-4'>
              <Menu
                mode='horizontal'
                items={items}
                onClick={handleClick}
                className='border-none w-[400px] text-gray-700'
              />
              <Dropdown
                menu={{ items: avatarMenuItems, onClick: handleAvatarClick }}
                placement='bottomRight'
                arrow>
                <Avatar className='cursor-pointer bg-blue-600'>
                  {isAuthenticated ? 'U' : <UserRound size={16} />}
                </Avatar>
              </Dropdown>
            </div>
          </div>
        </div>

        <Drawer
          title='Menú'
          placement='right'
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}>
          <Menu
            mode='vertical'
            items={items}
            onClick={handleClick}
            className='border-none'
          />
        </Drawer>
      </header>
    </>
  );
};
