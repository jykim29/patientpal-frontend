import { forwardRef, memo } from 'react';
import { twMerge } from 'tailwind-merge';

interface FormCheckboxProps extends React.ComponentPropsWithoutRef<'input'> {
  className?: string;
  name: string;
  label: string;
  [key: string]: any;
}

const FormCheckbox = forwardRef<any, FormCheckboxProps>(function FormCheckbox(
  { className = '', name, label, ...restProps },
  ref
) {
  const combinedContainerClassName = twMerge('relative ', className);
  return (
    <div className={combinedContainerClassName}>
      <input
        ref={ref}
        className="peer sr-only"
        type="checkbox"
        name={name}
        {...restProps}
      />
      <label
        className="ml-6 block select-none rounded-sm text-text-small before:absolute before:left-0 before:top-1/2 before:h-[16px] before:w-[16px] before:-translate-y-1/2 before:bg-[url('/assets/unchecked.svg')] before:bg-no-repeat peer-checked:before:bg-[url('/assets/checked.svg')] [input[type='checkbox']:focus-visible~&]:outline [input[type='checkbox']:focus-visible~&]:outline-2 [input[type='checkbox']:focus-visible~&]:outline-primary"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
});

export default memo(FormCheckbox);
