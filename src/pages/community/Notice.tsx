import { BoardList } from '@/components/board';

export default function Notice({ title }: { title: string }) {
  return (
    <section>
      <BoardList title={title} />
    </section>
  );
}
