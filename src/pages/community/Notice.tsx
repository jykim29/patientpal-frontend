import { useMemo } from 'react';

import { BoardList } from '@/components/board';

export default function Notice({ title }: { title: string }) {
  const categoryListArray = useMemo(() => ['제목', '작성자'], []);
  return (
    <section>
      <BoardList title={title} searchCategoryList={categoryListArray} />
    </section>
  );
}
