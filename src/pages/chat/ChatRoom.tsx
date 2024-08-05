import { Link } from 'react-router-dom';

import ChatRoomContainer from '@/components/Chat/ChatRoomContainer';

const {
  Title,
  Header,
  Body,
  Footer,
  ChatList,
  Messenger,
  Profile,
  MessageForm,
} = ChatRoomContainer;

// TODO : 리렌더링 최적화
export default function ChatRoom() {
  return (
    <section>
      <ChatRoomContainer>
        <Title>김영희 님과의 채팅</Title>
        <Messenger>
          <Header>
            <Link to="/mypage/chat/lobby">
              <img src="/assets/chevron_left.svg" alt="뒤로 가기" />
            </Link>
            <Profile />
          </Header>
          <Body>
            <ChatList />
          </Body>
          <Footer>
            <MessageForm />
          </Footer>
        </Messenger>
      </ChatRoomContainer>
    </section>
  );
}
