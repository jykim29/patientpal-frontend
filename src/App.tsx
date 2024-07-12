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
import { BoardWrite, BoardView, Forum, Notice } from './pages/community';
import { loader as forumLoader } from './components/board/BoardList';
import { ChatLobby, ChatRoom } from './pages/chat';
import { ContractWrite } from './pages/contract';
import MyPage from './pages/mypage/MyPage';
import ModifyPage from './pages/mypage/ModifyPage';
import MatchRecordPage from './pages/mypage/MatchRecordPage';
import ReviewPage from './pages/mypage/ReviewPage';
import MyPageLayout from './components/layout/MyPageLayout';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
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
                  loader: forumLoader,
                },
                {
                  path: 'post',
                  element: <BoardWrite />,
                },
                {
                  path: 'view/:id',
                  element: <BoardView />,
                },
              ],
            },
            {
              path: 'notice',
              children: [
                {
                  index: true,
                  element: <Notice title="공지사항" />,
                  loader: forumLoader,
                },
                {
                  path: 'post',
                  element: <BoardWrite />,
                },
                {
                  path: 'view/:postId',
                  element: <BoardView />,
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
              element: <ModifyPage />,
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
              path: 'contract',
              element: <div>my contract</div>,
            },
            {
              path: 'contract/write/:id',
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
  return <RouterProvider router={router} />;
}

export default App;
