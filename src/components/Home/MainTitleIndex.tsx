import React from 'react';

function MainTitleIndex({ text, size, children }) {
  const sizeVarient = {
    small: 'text-title-small',
    medium: 'text-title-medium',
    large: 'text-title-large',
  };

  return (
    <div className="relative flex w-full flex-col gap-4">
      <span className={`${sizeVarient[size]}`}>{text}</span>
      {children}
    </div>
  );
}

export default MainTitleIndex;
