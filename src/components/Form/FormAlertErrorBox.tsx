import { memo } from 'react';

function FormAlertErrorBox({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 [&>span]:rounded-md [&>span]:border-2 [&>span]:border-negative [&>span]:bg-red-100 [&>span]:p-1 [&>span]:text-text-small [&>span]:text-negative">
      <span>❗ {children}</span>
    </p>
  );
}

export default memo(FormAlertErrorBox);
