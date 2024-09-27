import {
  forwardRef,
  HTMLInputTypeAttribute,
  LegacyRef,
  memo,
  useCallback,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps {
  className?: string;
  type?: HTMLInputTypeAttribute;
  [key: string]: any;
}

const Input = forwardRef(function Input(
  { className = '', type = 'text', ...restProps }: InputProps,
  ref?: LegacyRef<HTMLInputElement>
) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  let inputType = type;
  if (type === 'password') inputType = isShowPassword ? 'text' : 'password';
  const combinedInputClassName = twMerge(
    'w-[180px] rounded-lg border border-black pl-2 pr-9  py-0.5 shadow-[0_0_0_0.3px_#000] outline-none focus-visible:border-secondary focus-visible:shadow-[0_0_0_0.5px_#6495ED]',
    className
  );
  const handleClick = useCallback(() => {
    setIsShowPassword((prev) => !prev);
  }, []);
  return (
    <div className="relative">
      <input
        type={inputType}
        className={combinedInputClassName}
        ref={ref}
        {...restProps}
      />
      {type === 'password' && (
        <button
          title={isShowPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
          type="button"
          className={`absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 bg-center bg-no-repeat ${twMerge([isShowPassword ? "bg-[url('/assets/images/show.svg')]" : "bg-[url('/assets/images/hide.svg')]"])}`}
          onClick={handleClick}
        ></button>
      )}
    </div>
  );
});

export default memo(Input);
