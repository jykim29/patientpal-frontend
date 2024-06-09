import { HTMLInputTypeAttribute, memo, useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps {
  className?: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  isHideLabel?: boolean;
  [key: string]: any;
}

function Input({
  className = '',
  label,
  type = 'text',
  name,
  placeholder = '',
  isHideLabel = false,
  ...restProps
}: InputProps) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  let inputType = type;
  if (type === 'password') inputType = isShowPassword ? 'text' : 'password';
  const combinedInputClassName = twMerge(
    'w-[180px] rounded-lg border border-black pl-2 pr-9  py-0.5 shadow-[0_0_0_0.5px_#000] outline-none focus-visible:border-secondary focus-visible:shadow-[0_0_0_0.5px_#6495ED]',
    className
  );
  const handleClick = useCallback(() => {
    setIsShowPassword((prev) => !prev);
  }, []);
  return (
    <div className="relative flex items-center gap-2">
      <label className={`${twMerge(isHideLabel && 'sr-only')}`} htmlFor={name}>
        {label}
      </label>
      <input
        type={inputType}
        className={combinedInputClassName}
        id={name}
        name={name}
        placeholder={placeholder}
        {...restProps}
      />

      {type === 'password' && (
        <button
          title={isShowPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
          type="button"
          className={`absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 bg-center bg-no-repeat ${twMerge([isShowPassword ? "bg-[url('/assets/show.svg')]" : "bg-[url('/assets/hide.svg')]"])}`}
          onClick={handleClick}
        ></button>
      )}
    </div>
  );
}

export default memo(Input);
