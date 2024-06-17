import { Outlet } from 'react-router-dom';
import Header from '../common/Header';

function AuthLayout() {
  return (
    <div className="flex h-screen w-screen flex-col justify-between">
      <Header />
      <main className="flex w-full flex-1 items-center justify-center bg-gray-light-medium py-10">
        <section className="flex h-full max-h-[650px] w-[50%] min-w-[800px] justify-between overflow-hidden rounded-3xl bg-white shadow-md">
          <Outlet />
          <div className="flex-1 bg-secondary"></div>
        </section>
      </main>
    </div>
  );
}

export default AuthLayout;
