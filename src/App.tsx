import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import './App.css';

import { API_FAILED } from './constants/api';
import { router } from './routes/router';
import { authService, memberService } from './services';

function App() {
  const [isInit, setIsInit] = useState<boolean>(false);

  useEffect(() => {
    authService
      .refreshToken()
      .then((res) => {
        if (res.status === API_FAILED) return;
        return memberService.getUserData(res.data.access_token, {
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
