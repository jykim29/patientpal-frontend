import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChatMessenger } from '@/components/Chat';
import { useChatContext } from '@/hooks/useChatContext';
import { chatService } from '@/services';
import { useAuthStore } from '@/store/useAuthStore';
import { API_FAILED } from '@/constants/api';
import { useModal } from '@/hooks/useModal';

export default function ChatRoom() {
  const { user, accessToken } = useAuthStore();
  const { alert } = useModal();
  const {
    connect,
    disconnect,
    getMessages,
    loadingState: [isLoading, setIsLoading],
    currentRoomDataState: [, setCurrentRoomData],
    currentRoomMessagesState: [, setCurrentRoomMessages],
  } = useChatContext();
  const { roomId } = useParams();
  const navigate = useNavigate();

  const initialize = async () => {
    setIsLoading(true);
    if (!user || !accessToken) {
      await alert('warning', '접근 권한이 없습니다.');
      return navigate('/');
    }
    // 채팅방 참여자 정보 수신 & 예외처리
    const roomDataResponse = await chatService.getRoomData(
      user,
      accessToken,
      Number(roomId),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (roomDataResponse.status === API_FAILED) {
      await alert('warning', roomDataResponse.data.message as string);
      return navigate('/mypage/chat/lobby');
    }
    setCurrentRoomData(roomDataResponse.data);
    // 웹소켓 연결
    connect(Number(roomId));
    // 채팅방 메세지 데이터 수신
    const getMessagesResponse = await getMessages(Number(roomId), 0);
    if (!getMessagesResponse) {
      await alert('warning', '서버 오류로 메세지를 불러올 수 없습니다.');
      return navigate('/mypage/chat/lobby');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    initialize();
    return () => {
      setCurrentRoomMessages([]);
      disconnect(Number(roomId));
    };
  }, []);
  return <section>{!isLoading && <ChatMessenger />}</section>;
}
