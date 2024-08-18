import { Pagination } from './common';
import { MemberListItem } from './member';

type ChatType = 'PUBLIC' | 'PRIVATE' | 'DIRECT';
type MessageType = 'CHAT' | 'JOIN' | 'LEAVE';

export interface GetRoomInfoResponse {
  chatId: number;
  chatType: ChatType;
  managerIds: [number, number];
}

export type GetRoomDataResponse = {
  partnerInfo: MemberListItem;
  chatId: number;
  chatType: ChatType;
};
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
  name?: string;
  profileImageUrl?: string;
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
