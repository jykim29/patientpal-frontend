import { useEffect, useRef, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { EventSourcePolyfill } from 'event-source-polyfill';

import './App.css';

import { router } from './routes/router';
import { authService, notificationService } from './services';
import { useModalStore } from './store/useModalStore';
import Modal from './components/common/Modal';
import { FeedbackModal } from './components/Modal';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const [isInit, setIsInit] = useState<boolean>(false);
  const { accessToken, isLoggedIn } = useAuthStore();
  const { dialogState } = useModalStore();
  const eventSource = useRef<EventSourcePolyfill>();

  useEffect(() => {
    if (isLoggedIn && accessToken)
      notificationService.createSSEConnection({
        targetRef: eventSource,
        accessToken,
      });
    if (!isLoggedIn && !accessToken && eventSource.current)
      eventSource.current.close();
  }, [isLoggedIn, accessToken]);

  useEffect(() => {
    authService.initializeAuth().then(() => setIsInit(true));
    return () => {
      if (eventSource.current) eventSource.current.close();
    };
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
