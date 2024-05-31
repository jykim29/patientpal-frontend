import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Error from './components/common/Error';
import AuthLayout from './components/layout/AuthLayout';

function App() {
  const router = createBrowserRouter([
    {
      path : '/',
      element : <Layout></Layout>,
      errorElement : <Error/>,
      children : [
        {
          path : '/',
          element : <Home/>
        }
      ],
      
    },
    {
      path : '/auth',
      element :  <AuthLayout />,
      children : [
        {
          path : 'login',
          element : <Login /> 
        }
      ]
    }
  ])

  return (
      <RouterProvider router={router}/>
  )
}

export default App
