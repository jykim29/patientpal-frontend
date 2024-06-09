import { useMemo } from 'react';

import { BoardList } from '@/components/board';

export default function Forum() {
  const categoryListArray = useMemo(() => ['제목', '작성자'], []);
  return (
    <section>
      <BoardList title="자유게시판" searchCategoryList={categoryListArray} />
    </section>
  );
}
