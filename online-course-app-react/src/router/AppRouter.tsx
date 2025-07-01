import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from '@/router/AuthGuard';

import { MainLayout } from '@/Layouts/MainLayout';

import HomePage from '@/pages/HomePage';
import ProfilePage from '@/pages/Protected/MyProfilePage';
import LoginPage from '@/pages/SignInPage';
import { CourseGuard } from './CourseGuard';

const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const CursosPage = lazy(() => import('@/pages/CoursesListPage'));
const CursoPage = lazy(() => import('@/pages/Protected/CursoPage'));
const AssessmentPage = lazy(
  () => import('@/pages/Protected/Assessments/AssessmentPage'),
);
const ResultsPage = lazy(
  () => import('@/pages/Protected/Assessments/ResultsPage'),
);

const protectedLayout = (element: React.ReactNode) => {
  return <CourseGuard>{element}</CourseGuard>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        index: true,
        element: <HomePage />,
      },
      {
        path: 'cursos',
        element: (
          <Suspense fallback={<div>Cargando cursos...</div>}>
            <CursosPage />
          </Suspense>
        ),
      },
      {
        path: 'cursos',
        element: <ProtectedRoute />,
        children: [
          {
            path: ':courseId',
            element: (
              <Suspense fallback={<div>Cargando curso...</div>}>
                <CursoPage />
              </Suspense>
            ),
          },
          {
            path: ':courseId/evaluacion',
            element: protectedLayout(
              <Suspense fallback={<div>Cargando evaluación...</div>}>
                <AssessmentPage />
              </Suspense>,
            ),
          },
          {
            path: ':courseId/evaluacion/results',
            element: protectedLayout(
              <Suspense fallback={<div>Cargando...</div>}>
                <ResultsPage />
              </Suspense>,
            ),
          },
        ],
      },
      {
        path: 'perfil',
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            index: true,
            element: (
              <Suspense fallback={<div>Cargando...</div>}>
                <ProfilePage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: 'registro',
    element: (
      <Suspense fallback={<div>Cargando...</div>}>
        <RegisterPage />
      </Suspense>
    ),
  },
  { path: 'login', element: <LoginPage /> },
  {
    path: '*',
    element: <div>404 - Página no encontrada</div>,
  },
]);
