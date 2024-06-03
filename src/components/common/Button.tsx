import { ComponentPropsWithoutRef, PropsWithChildren, memo } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
  icon?: { url: string; alt: string; className: string };
  [key: string]: any;
}

function Button({
  type = 'button',
  className = '',
  icon,
  children,
  ...restProps
}: PropsWithChildren<ButtonProps>) {
  const combinedButtonClassName = twMerge(
    'rounded-md bg-primary px-4 py-2.5 text-text-medium text-white hover:brightness-[0.95] active:brightness-[1.05] transition-all inline-flex justify-center gap-2 items-center',
    className
  );

  return (
    <button className={combinedButtonClassName} type={type} {...restProps}>
      {icon && <img className={icon.className} src={icon.url} alt={icon.alt} />}
      {children && <span>{children}</span>}
    </button>
  );
}

export default memo(Button);
