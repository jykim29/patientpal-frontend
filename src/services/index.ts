import { httpClient } from '@/api/httpClient';
import AuthService from './AuthService';
import BoardService from './BoardService';
import MemberService from './MemberService';
import ChatService from './ChatService';

export const authService = new AuthService(httpClient);
export const boardService = new BoardService(httpClient);
export const memberService = new MemberService(httpClient);
export const chatService = new ChatService(httpClient);
