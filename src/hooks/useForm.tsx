import { useCallback, useEffect, useState } from 'react';

// export type Validator<T> = {
//   [Key in keyof T]?: {
//     regex: string;
//     message: string;
//   };
// };
// type ErrorObject<T> = {
//   [Key in keyof T]?: { isValid: boolean; message: string } | null;
// };

type Validate<T> = (values: T) => Map<any, any>;

/*
  TODO
  1. 한계점 : regex가 단순히 입력값에 대해 정규식 검증만 지원함
    - 해결해야할 점 : 함수도 지원하여 다양한 검증 방법에 대응
    (예를들어, 두 개의 값 일치 여부, 다수의 값 true 여부 등... )
*/
export function useForm<T extends { [key: string]: any }>(
  formData: T,
  validate: Validate<T>
  // validator?: Validator<T>
) {
  const [data, setData] = useState<T>(formData);
  const [error, setError] = useState<ReturnType<Validate<T>>>(new Map());

  // const validate = () => {
  //   if (!validator) return;
  //   const newErrorObject = {} as any;
  //   const keyValueArray = Object.entries(data as object);
  //   keyValueArray.forEach(([key, value]) => {
  //     if (value.length === 0) return;
  //     const regex = new RegExp(validator[key]?.regex as string);
  //     if (!regex.test(value))
  //       newErrorObject[key] = {
  //         isValid: false,
  //         message: validator[key]?.message as string,
  //       };
  //     // else delete newErrorObject[key as keyof T];
  //   });
  //   setError(newErrorObject);
  // };

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
      console.log(data);
      const errors = validate(data);
      if ([...errors.values()].length > 0) return setError(errors);
      else setError(new Map());
      callback();
    },
    [data]
  );

  useEffect(() => {
    // validator && validate();
  }, [data]);

  return { formData: data, handler: { onChange, onSubmit }, error };
}
