import { useContext } from 'react';
import { ChatContext } from '@/context/ChatContextProvider';

export const useChatContext = () => {
  const values = useContext(ChatContext);
  if (!values)
    throw new Error(
      '현재 useChatContext를 호출한 컴포넌트는 ChatContext 내부에 포함되어있지 않습니다.'
    );
  return values;
};
