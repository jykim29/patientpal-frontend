import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import { SignIn, SignUp } from './pages/auth';
import Error from './components/common/Error';
import AuthLayout from './components/layout/AuthLayout';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout></Layout>,
      errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <Home />,
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
