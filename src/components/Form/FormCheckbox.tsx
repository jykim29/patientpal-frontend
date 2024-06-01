import { memo } from 'react';

interface FormCheckboxProps {
  name: string;
  label: string;
  value: string;
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormCheckbox({
  name,
  label,
  value,
  isChecked,
  onChange,
}: FormCheckboxProps) {
  return (
    <div className="relative">
      <input
        className="peer sr-only"
        type="checkbox"
        name={name}
        id={name}
        checked={isChecked}
        value={value}
        onChange={onChange}
      />
      <label
        className="ml-6 block select-none text-text-medium before:absolute before:left-0 before:top-1/2 before:h-[16px] before:w-[16px] before:-translate-y-1/2 before:bg-[url('/assets/unchecked.svg')] before:bg-no-repeat peer-checked:before:bg-[url('/assets/checked.svg')]"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}

export default memo(FormCheckbox);
