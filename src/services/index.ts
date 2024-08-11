import { httpClient } from '@/api/httpClient';
import AuthService from './AuthService';
import BoardService from './BoardService';
import MemberService from './MemberService';

export const authService = new AuthService(httpClient);
export const boardService = new BoardService(httpClient);
export const memberService = new MemberService(httpClient);
