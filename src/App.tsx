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
          path: '/search/city',
          element: <SearchPage />,
        },
        {
          path: 'search/map',
          element: <SearchPage />,
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
          path: '/chat',
          element: <MainLayout title="채팅" />,
          errorElement: <Error />,
          children: [
            {
              index: true,
              element: <Navigate to={'lobby'} />,
            },
            {
              path: 'lobby',
              element: <ChatLobby title="채팅 목록" />,
            },
            {
              path: 'room/:roomId',
              element: <ChatRoom />,
            },
          ],
        },
        {
          path: '/contract',
          element: <MainLayout title="나의 계약" />,
          errorElement: <Error />,
          children: [
            {
              index: true,
              element: <Navigate to={'contract'} />,
            },
            {
              path: 'write/:contractId',
              element: <ContractWrite />,
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
