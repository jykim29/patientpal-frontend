import { useEffect, useState } from 'react';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import './App.css';
import Layout from './components/layout/Layout';
import Error from './components/common/Error';
import AuthLayout from './components/layout/AuthLayout';
import SearchPage from './pages/SearchPage';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import { SignIn, SignUp } from './pages/auth';
import {
  BoardWrite,
  BoardView,
  Forum,
  Notice,
  listLoader,
  postLoader,
  BoardModify,
} from './pages/community';
import { ChatLobby, ChatRoom } from './pages/chat';
import { ContractWrite } from './pages/contract';
import MyPage from './pages/mypage/MyPage';
import ProfilePage from './pages/mypage/ProfilePage';
import MatchRecordPage from './pages/mypage/MatchRecordPage';
import ReviewPage from './pages/mypage/ReviewPage';
import MyPageLayout from './components/layout/MyPageLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { authService } from './services/AuthService';
import { API_FAILED } from './constants/api';

function App() {
  const [isInit, setIsInit] = useState<boolean>(false);
  const router = createBrowserRouter([
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
              path: '/community',
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
                      element: <Forum title="자유게시판" />,
                      loader: listLoader,
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
                      element: <Notice title="공지사항" />,
                      loader: listLoader,
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
  useEffect(() => {
    authService
      .refreshToken()
      .then((res) => {
        if (res.status === API_FAILED) return;
        return authService.getUserData(res.data.access_token, {
          headers: {
            Authorization: `Bearer ${res.data.access_token}`,
          },
        });
      })
      .then((res) => {
        if (res?.status === API_FAILED) return;
        return setIsInit(true);
      });
  }, []);

  return isInit ? <RouterProvider router={router} /> : <></>;
}

export default App;
