import { Board } from '@/components/board';

export function Component() {
  return (
    <>
      <Board boardType="notice" title="공지사항" />
    </>
  );
}

Component.displayName = 'NoticeBoard';
