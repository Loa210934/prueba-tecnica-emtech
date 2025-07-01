import { useNotification } from '@/hooks/useNotification';
import { courseDataService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/Auth.store';
import { userData, type CoursesUser } from '@/types/User/User';
import { Avatar, Button, Image, Skeleton, Space } from 'antd';
import { Calendar, Settings, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export const UserSummary = () => {
  const { user } = useAuthStore();
  const { contextHolder, openNotification } = useNotification();
  const [userD, setuserD] = useState<CoursesUser | null>(null);
  useEffect(() => {
    courseDataService().then(data => {
      setuserD(data);
    });
  }, []);
  return (
    <>
      {contextHolder}
      {user && (
        <div className='bg-white rounded-lg shadow-sm p-8 mb-8'>
          <div className='flex flex-col md:flex-row items-center md:items-start gap-6'>
            <Avatar size={100} className='overflow-hidden'>
              <Image
                src='https://thispersondoesnotexist.com/'
                preview={false}
                alt='avatar'
                className='w-full h-full object-cover rounded-full'
              />
            </Avatar>
            <div className='flex-1 text-center md:text-left'>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                {user.name}
              </h1>
              <p className='text-gray-600 mb-4'>{user.email}</p>
              <div className='flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500'>
                <div className='flex items-center'>
                  <Calendar className='h-4 w-4 mr-1' />
                  {userD ? (
                    <span>Miembro desde {userD.joinDate}</span>
                  ) : (
                    <Skeleton.Input active={!userD} />
                  )}
                </div>
                <div className='flex items-center'>
                  <TrendingUp className='h-4 w-4 mr-1' />
                  {userD ? (
                    <span>Nivel {userD.level}</span>
                  ) : (
                    <Skeleton.Input active={!userD} />
                  )}
                </div>
              </div>
            </div>

            <Button
              variant='outlined'
              className='flex items-center gap-2 bg-transparent'
              onClick={() => {
                openNotification();
              }}>
              <Settings className='h-4 w-4' />
              Configuración
            </Button>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-blue-600'>
                {userD ? (
                  userD.totalCourses
                ) : (
                  <Skeleton.Input active={!userD} size='small' />
                )}
              </div>
              <div className='text-sm text-gray-500'>Cursos Inscritos</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-green-600'>
                <Space>
                  {userD ? (
                    userD.completedCourses
                  ) : (
                    <Skeleton.Input active={!userD} size='small' />
                  )}
                </Space>
              </div>
              <div className='text-sm text-gray-500'>Completados</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-purple-600'>
                <Space>
                  {userD ? (
                    userD?.totalHours
                  ) : (
                    <Skeleton.Input active={!userD} size='small' />
                  )}
                </Space>
              </div>
              <div className='text-sm text-gray-500'>Horas de Estudio</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-orange-600'>
                <Space>
                  {userD ? (
                    userD?.certificates
                  ) : (
                    <Skeleton.Input active={!userD} size='small' />
                  )}
                </Space>
              </div>
              <div className='text-sm text-gray-500'>Certificados</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
