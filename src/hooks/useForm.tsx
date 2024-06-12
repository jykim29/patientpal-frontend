import { useCallback, useEffect, useState } from 'react';

export type Validator<T> = {
  [Key in keyof T]?: {
    regex: string;
    message: string;
  };
};
type ErrorObject<T> = {
  [Key in keyof T]?: { isValid: boolean; message: string } | null;
};

/*
  TODO
  1. 한계점 : regex가 단순히 입력값에 대해 정규식 검증만 지원함
    - 해결해야할 점 : 함수도 지원하여 다양한 검증 방법에 대응
    (예를들어, 두 개의 값 일치 여부, 다수의 값 true 여부 등... )
*/
export function useForm<T extends { [key: string]: any }>(
  formData: T,
  validator?: Validator<T>
) {
  const [data, setData] = useState(formData);
  const [error, setError] = useState<ErrorObject<T>>({});

  const validate = () => {
    if (!validator) return;
    const newErrorObject = { ...error };
    const keyValueArray = Object.entries(data as object);
    keyValueArray.forEach(([key, value]) => {
      if (value.length === 0) return;
      const regex = new RegExp(validator[key]?.regex as string);
      if (!regex.test(value))
        newErrorObject[key as keyof T] = {
          isValid: false,
          message: validator[key]?.message as string,
        };
      else delete newErrorObject[key as keyof T];
    });
    setError(newErrorObject);
  };

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, checked } = e.currentTarget;
    if (name === 'contact' && Number.isNaN(Number(value))) return;
    setData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>, callback: () => any) => {
      e.preventDefault();
      callback();
    },
    []
  );

  useEffect(() => {
    validator && validate();
  }, [data]);

  return { formData: data, handler: { onChange, onSubmit }, error };
}
