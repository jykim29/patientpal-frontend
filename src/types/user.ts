export type UserRole = 'USER' | 'CAREGIVER';
export type AdminRole = 'ADMIN';

export interface UserInfo {
  role: UserRole;
  // 미정
}
