import { createBrowserRouter, Navigate } from 'react-router-dom';

import AuthLayout from '@/components/layout/AuthLayout';
import Layout from '@/components/layout/Layout';
import MainLayout from '@/components/layout/MainLayout';
import MyPageLayout from '@/components/layout/MyPageLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { SignIn, SignUp } from '@/pages/auth';
import { ChatLobby, ChatRoom } from '@/pages/chat';
import {
  FreeBoard,
  BoardWrite,
  BoardModify,
  postLoader,
  BoardView,
  NoticeBoard,
} from '@/pages/community';
import { ContractWrite } from '@/pages/contract';
import Home from '@/pages/Home';
import MatchRecordPage from '@/pages/mypage/MatchRecordPage';
import MyPage from '@/pages/mypage/MyPage';
import ProfilePage from '@/pages/mypage/ProfilePage';
import ReviewPage from '@/pages/mypage/ReviewPage';
import SearchPage from '@/pages/SearchPage';
import Error from '@/components/common/Error';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          {
            path: '/search',
            errorElement: <Error />,
            children: [
              {
                index: true,
                element: <Navigate to={'city'} />,
              },
              {
                path: 'city',
                element: <SearchPage searchType="city" />,
              },
              {
                path: 'map',
                element: <SearchPage searchType="map" />,
              },
            ],
          },
          {
            path: 'community',
            element: <MainLayout title="커뮤니티" />,
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
                    element: <FreeBoard />,
                  },
                  {
                    path: 'post',
                    element: <BoardWrite />,
                  },
                  {
                    path: 'modify/:postId',
                    element: <BoardModify />,
                    loader: postLoader,
                  },
                  {
                    path: 'view/:postId',
                    element: <BoardView />,
                    loader: postLoader,
                  },
                ],
              },
              {
                path: 'notice',
                children: [
                  {
                    index: true,
                    element: <NoticeBoard />,
                  },
                  {
                    path: 'post',
                    element: <BoardWrite />,
                  },
                  {
                    path: 'modify/:postId',
                    element: <BoardModify />,
                    loader: postLoader,
                  },
                  {
                    path: 'view/:postId',
                    element: <BoardView />,
                    loader: postLoader,
                  },
                ],
              },
            ],
          },
          {
            path: '/mypage',
            errorElement: <Error />,
            element: <MyPageLayout />,
            children: [
              {
                index: true,
                element: <MyPage />,
              },
              {
                path: 'profile',
                element: <ProfilePage />,
              },
              {
                path: 'chat/lobby',
                element: <ChatLobby title="채팅 목록" />,
              },
              {
                path: 'chat/room/:roomId',
                element: <ChatRoom />,
              },
              {
                path: 'contract/write/:memberId',
                element: <ContractWrite />,
              },
              {
                path: 'match-record',
                element: <MatchRecordPage />,
              },
              {
                path: 'review',
                element: <ReviewPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to={'signin'} />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
]);
