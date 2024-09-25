import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChatMessenger } from '@/components/Chat';
import { useChatContext } from '@/hooks/useChatContext';

export function Component() {
  const {
    disconnect,
    loadingState: [isLoading],
    currentRoomMessagesState: [, setCurrentRoomMessages],
  } = useChatContext();
  const { roomId } = useParams();

  useEffect(() => {
    return () => {
      setCurrentRoomMessages({
        messages: [],
        pageNumber: 0,
        totalPages: 0,
        first: true,
        last: true,
      });
      disconnect(Number(roomId));
    };
  }, []);
  return <section>{!isLoading && <ChatMessenger />}</section>;
}

Component.displayName = 'ChatRoom';
