import { memo, useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface FormInputProps extends React.ComponentPropsWithoutRef<'input'> {
  className?: string;
  type?: string;
  name: string;
  label: string;
  [key: string]: any;
}

function FormInput({
  className = '',
  type = 'text',
  name,
  label,
  ...restProps
}: FormInputProps) {
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
        className="peer w-full rounded-lg border border-gray-light-medium px-4 py-2.5 text-text-medium hover:border-black focus:outline-secondary [&:not(:placeholder-shown)]:border-2 [&:not(:placeholder-shown)]:border-secondary"
        type={inputType}
        name={name}
        placeholder=""
        {...restProps}
      />
      <label
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 select-none text-text-medium text-gray-medium transition-all peer-focus-visible:left-3 peer-focus-visible:top-0 peer-focus-visible:bg-white peer-focus-visible:px-1 peer-focus-visible:text-text-small peer-focus-visible:text-secondary peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-text-small peer-[:not(:placeholder-shown)]:text-secondary"
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
}

export default memo(FormInput);
