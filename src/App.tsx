import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import './App.css';

import { API_FAILED } from './constants/api';
import { router } from './routes/router';
import { authService, memberService } from './services';
import { useModalStore } from './store/useModalStore';
import Modal from './components/common/Modal';
import { FeedbackModal } from './components/Modal';

function App() {
  const [isInit, setIsInit] = useState<boolean>(false);
  const { dialogState } = useModalStore();

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

  return isInit ? (
    <>
      {dialogState && (
        <Modal closeOnOverlayClick={dialogState.type === 'confirm'}>
          <FeedbackModal
            type={dialogState.type}
            onOk={dialogState.handleOk}
            onCancel={dialogState.handleCancel}
          >
            {dialogState.message}
          </FeedbackModal>
        </Modal>
      )}
      <RouterProvider router={router} />
    </>
  ) : (
    <></>
  );
}

export default App;
