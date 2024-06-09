import { memo } from 'react';

function TooltipMessageBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="input-validation-message-box invisible ml-2 w-[150px] peer-focus-within:visible">
      <span>{children}</span>
    </div>
  );
}

export default memo(TooltipMessageBox);
