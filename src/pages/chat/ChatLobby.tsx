import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatRoomList } from '@/components/Chat';
import { useChatContext } from '@/hooks/useChatContext';
import { chatService } from '@/services';
import { useAuthStore } from '@/store/useAuthStore';
import { API_FAILED } from '@/constants/api';

export default function ChatLobby({ title }: { title: string }) {
  const { user, accessToken } = useAuthStore();
  const {
    loadingState: [isLoading, setIsLoading],
    roomListState: [_, setRoomList],
  } = useChatContext();
  const navigate = useNavigate();

  const initialize = async () => {
    setIsLoading(true);
    if (!user || !accessToken) {
      alert('접근 권한이 없습니다.');
      return navigate('/');
    }
    const getAllRoomDataResponse = await chatService.getAllRoomData(
      user,
      accessToken,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (getAllRoomDataResponse.status === API_FAILED) {
      alert(getAllRoomDataResponse.data.message);
      return navigate('/');
    }
    setRoomList(getAllRoomDataResponse.data);
    setIsLoading(false);
  };
  useEffect(() => {
    initialize();
  }, []);
  return (
    <section>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-title-small">{title}</h3>
      </div>

      {!isLoading && <ChatRoomList />}
    </section>
  );
}
