import { Outlet } from 'react-router-dom';

export default function MainLayout({ title }: { title: string }) {
  return (
    <main className="flex-1 px-[52px] py-8">
      <h2 className="relative inline-block from-secondary to-tertiary text-title-medium after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-full after:bg-gradient-to-r">
        {title}
      </h2>
      <Outlet />
    </main>
  );
}
