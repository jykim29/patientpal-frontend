import { httpClient } from '@/api/httpClient';
import AuthService from './AuthService';
import BoardService from './BoardService';
import MemberService from './MemberService';
import ChatService from './ChatService';
import { NotificationService } from './NotificationService';
import ReviewService from './ReviewService';

export const authService = new AuthService(httpClient);
export const boardService = new BoardService(httpClient);
export const memberService = new MemberService(httpClient);
export const chatService = new ChatService(httpClient);
export const notificationService = new NotificationService(httpClient);
export const reviewService = new ReviewService(httpClient);
