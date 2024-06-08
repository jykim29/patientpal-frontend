import { twMerge } from 'tailwind-merge';

interface InputProps {
  className?: string;
  label: string;
  name: string;
  placeholder?: string;
  isHideLabel?: boolean;
  [key: string]: any;
}

export default function Input({
  className = '',
  label,
  name,
  placeholder = '',
  isHideLabel = false,
  ...restProps
}: InputProps) {
  const combinedInputClassName = twMerge(
    'w-[180px] rounded-lg border border-black px-2 py-0.5 shadow-[0_0_0_0.5px_#000] outline-none focus-visible:border-secondary focus-visible:shadow-[0_0_0_0.5px_#6495ED]',
    className
  );
  return (
    <div className="flex items-center gap-2">
      <label className={`${twMerge(isHideLabel && 'sr-only')}`} htmlFor={name}>
        {label}
      </label>
      <input
        className={combinedInputClassName}
        id={name}
        name={name}
        placeholder={placeholder}
        {...restProps}
      />
    </div>
  );
}
