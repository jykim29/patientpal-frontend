import { Pagination } from './common';

type ChatType = 'PUBLIC' | 'PRIVATE' | 'DIRECT';
type MessageType = 'CHAT' | 'JOIN' | 'LEAVE';

export interface GetRoomInfoResponse {
  chatId: number;
  chatType: ChatType;
  managerIds: [number, number];
}
export type GetJoinedRoomInfoResponse = GetRoomInfoResponse[];
export type CreateRoomRequestBody = {
  memberIds: [number, number];
};

export interface MessageItem {
  createdDate: string;
  lastModifiedDate: string;
  profilePublicTime: string;
  id: number;
  messageType: MessageType;
  content: string;
  senderId: number;
  chatId: number;
}
export interface GetMessagesResponse extends Pagination {
  content: MessageItem[];
}
export interface PostMessageRequestBody {
  content: string;
  messageType: MessageType;
  chatId: number;
  senderId: number;
}
export interface PostMessageResponse extends PostMessageRequestBody {
  messageId: number;
}
