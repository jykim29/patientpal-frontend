import { useCallback, useState } from 'react';

export type Validate<T> = (values: T) => Map<any, any>;

export function useForm<T extends { [key: string]: any }>(
  formData: T,
  validate: Validate<T>
) {
  const [data, setData] = useState<T>(formData);
  const [error, setError] = useState<ReturnType<Validate<T>>>(new Map());

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, checked } = e.currentTarget;
    setData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>, callback: () => any) => {
      e.preventDefault();
      const errors = validate(data);
      if ([...errors.values()].length > 0) return setError(errors);
      else setError(new Map());
      callback();
    },
    [data]
  );

  return { formData: data, handler: { onChange, onSubmit }, error };
}
