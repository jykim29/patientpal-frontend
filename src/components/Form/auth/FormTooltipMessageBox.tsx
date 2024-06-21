import { memo } from 'react';

function TooltipMessageBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="input-validation-message-box invisible ml-2 flex-1 px-2 peer-focus-within:visible">
      <span>{children}</span>
    </div>
  );
}

export default memo(TooltipMessageBox);
