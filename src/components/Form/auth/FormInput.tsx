import { forwardRef, memo, useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface FormInputProps extends React.ComponentPropsWithoutRef<'input'> {
  className?: string;
  type?: string;
  name: string;
  label: string;
  isValid?: boolean;
  [key: string]: any;
}

const FormInput = forwardRef<any, FormInputProps>(function FormInput(
  { className = '', type = 'text', name, label, isValid = true, ...restProps },
  ref
) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  let inputType = type;
  if (type === 'password') inputType = isShowPassword ? 'text' : 'password';

  const combinedContainerClassName = twMerge('relative', className);

  const handleClick = useCallback(() => {
    setIsShowPassword((prev) => !prev);
  }, []);

  return (
    <div className={combinedContainerClassName}>
      <input
        className={`${twMerge('peer', isValid ? 'form-input' : 'form-input-invalid')}`}
        type={inputType}
        name={name}
        placeholder=""
        ref={ref}
        {...restProps}
      />

      <label
        className={`peer-focus-visible:text-text-small peer-[:not(:placeholder-shown)]:text-text-small ${twMerge('pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 select-none text-text-medium text-gray-medium transition-all peer-focus-visible:left-3 peer-focus-visible:top-0 peer-focus-visible:bg-white peer-focus-visible:px-1 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1', isValid ? 'peer-focus-visible:text-secondary peer-[:not(:placeholder-shown)]:text-secondary' : 'peer-focus-visible:text-negative peer-[:not(:placeholder-shown)]:text-negative')}`}
        htmlFor={name}
      >
        {label}
      </label>

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
});

export default memo(FormInput);
