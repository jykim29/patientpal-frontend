import classNames from 'classnames';
import { PropsWithChildren, memo } from 'react';

interface ButtonProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  icon?: { url: string; alt: string; className: string };
  className?: string;
  [key: string]: any;
}

function Button({
  type = 'button',
  className = '',
  icon,
  children,
  ...restProps
}: PropsWithChildren<ButtonProps>) {
  const combinedButtonClassName = classNames(
    'rounded-md bg-primary px-4 py-2.5 text-text-medium text-white hover:brightness-[0.95] active:brightness-[1.05] transition-all inline-flex justify-center gap-2 items-center',
    className
  );

  return (
    <button className={combinedButtonClassName} type={type} {...restProps}>
      {icon && <img className={icon.className} src={icon.url} alt={icon.alt} />}
      {children && <span className="">{children}</span>}
    </button>
  );
}

export default memo(Button);
