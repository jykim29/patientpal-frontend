import React from 'react';

interface Props {
  title: string;
}

const MenuTitle = ({ title }: Props) => {
  return (
    <h1 className="w-max bg-gradient-to-r from-primary to-secondary pb-1 text-title-medium">
      <div className="h-full w-max bg-white pb-2">{title}</div>
    </h1>
  );
};

export default MenuTitle;
