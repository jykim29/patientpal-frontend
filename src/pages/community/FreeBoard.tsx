import { Board } from '@/components/board';

export function Component() {
  return (
    <>
      <Board boardType="board" title="자유게시판" />
    </>
  );
}

Component.displayName = 'FreeBoard';
