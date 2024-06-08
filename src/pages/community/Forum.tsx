import { useMemo } from 'react';

import { BoardList } from '@/components/board';

export default function Forum() {
  const categoryListArray = useMemo(() => ['제목', '작성자'], []);
  return (
    <main className="flex-1 px-[52px] py-8">
      <h2 className="relative inline-block from-secondary to-tertiary text-title-medium after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-full after:bg-gradient-to-r">
        커뮤니티
      </h2>

      <section>
        <BoardList title="자유게시판" searchCategoryList={categoryListArray} />
      </section>
    </main>
  );
}
