import { createBrowserRouter, Navigate } from 'react-router-dom';
import Error from '@/components/common/Error';

export const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('@/components/layout/Layout'),
    errorElement: <Error />,
    children: [
      {
        index: true,
        lazy: () => import('@/pages/Home'),
      },
      {
        path: '/',
        lazy: () => import('@/components/ProtectedRoute'),
        children: [
          {
            path: '/search',
            lazy: () => import('@/components/layout/MainLayout'),
            errorElement: <Error />,
            children: [
              {
                index: true,
                element: <Navigate to={'city'} />,
              },
              {
                path: 'city',
                lazy: () => import('@/pages/SearchPage'),
              },
              {
                path: 'map',
                lazy: () => import('@/pages/SearchPage'),
              },
            ],
          },
          {
            path: 'community',
            lazy: () => import('@/components/layout/MainLayout'),
            errorElement: <Error />,
            children: [
              {
                index: true,
                element: <Navigate to={'forum'} />,
              },
              {
                path: 'forum',
                children: [
                  {
                    index: true,
                    lazy: () => import('@/pages/community/FreeBoard'),
                  },
                  {
                    path: 'post',
                    lazy: () => import('@/pages/community/BoardWrite'),
                  },
                  {
                    path: 'modify/:postId',
                    async lazy() {
                      const { Component } = await import(
                        '@/pages/community/BoardModify'
                      );
                      const { loader } = await import(
                        '@/pages/community/loader'
                      );
                      return { Component, loader };
                    },
                  },
                  {
                    path: 'view/:postId',
                    async lazy() {
                      const { Component } = await import(
                        '@/pages/community/BoardView'
                      );
                      const { loader } = await import(
                        '@/pages/community/loader'
                      );
                      return { Component, loader };
                    },
                  },
                ],
              },
              {
                path: 'notice',
                children: [
                  {
                    index: true,
                    lazy: () => import('@/pages/community/NoticeBoard'),
                  },
                  {
                    path: 'post',
                    lazy: () => import('@/pages/community/BoardWrite'),
                  },
                  {
                    path: 'modify/:postId',
                    async lazy() {
                      const { Component } = await import(
                        '@/pages/community/BoardModify'
                      );
                      const { loader } = await import(
                        '@/pages/community/loader'
                      );
                      return { Component, loader };
                    },
                  },
                  {
                    path: 'view/:postId',
                    async lazy() {
                      const { Component } = await import(
                        '@/pages/community/BoardView'
                      );
                      const { loader } = await import(
                        '@/pages/community/loader'
                      );
                      return { Component, loader };
                    },
                  },
                ],
              },
            ],
          },
          {
            path: '/mypage',
            errorElement: <Error />,
            lazy: () => import('@/components/layout/MainLayout'),
            children: [
              {
                index: true,
                lazy: () => import('@/pages/mypage/MyPage'),
              },
              {
                path: 'profile',
                lazy: () => import('@/pages/mypage/ProfilePage'),
              },
              {
                path: 'chat',
                lazy: () => import('@/context/ChatContextProvider'),
                children: [
                  {
                    index: true,
                    element: <Navigate to={'lobby'} replace />,
                  },
                  {
                    path: 'lobby',
                    lazy: () => import('@/pages/chat/ChatLobby'),
                  },
                  {
                    path: 'room/:roomId',
                    lazy: () => import('@/pages/chat/ChatRoom'),
                  },
                ],
              },
              {
                path: 'contract/write/:memberId',
                lazy: () => import('@/pages/contract/ContractWrite'),
              },
              {
                path: 'match-record',
                lazy: () => import('@/pages/mypage/MatchRecordPage'),
              },
              {
                path: 'review',
                lazy: () => import('@/pages/mypage/ReviewPage'),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    lazy: () => import('@/components/layout/AuthLayout'),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to={'signin'} />,
      },
      {
        path: 'signin',
        lazy: () => import('@/pages/auth/SignIn'),
      },
      {
        path: 'signup',
        lazy: () => import('@/pages/auth/SignUp'),
      },
    ],
  },
]);
