import { Outlet } from 'react-router-dom';
import Header from '../common/Header';

function AuthLayout() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="w-full">
        <Header />
      </div>
      <main className="mx-auto flex w-full min-w-[1440px] flex-1 items-center justify-center bg-gray-light-medium py-2">
        <section className="flex h-[650px] w-[800px] justify-between overflow-hidden rounded-3xl bg-white shadow-md">
          <Outlet />
          <div className="flex-1 bg-secondary"></div>
        </section>
      </main>
    </div>
  );
}

export default AuthLayout;
