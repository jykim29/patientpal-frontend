import { useCallback, useState } from 'react';
import { userIdFromLocalStorage } from '../utils/getUserIdFromLocalStorage';

type FormType = 'signIn' | 'signUp' | 'board';
type UserRole = 'USER' | 'CAREGIVER';

export interface SignInFormData {
  username: string;
  password: string;
  isRememberId: boolean;
}
export interface SignUpFormData {
  role: UserRole;
  username: string;
  password: string;
  passwordConfirm: string;
  contact: string;
  termOfUse: boolean;
  personalInformation: boolean;
}
export interface BoardFormData {
  title: string;
  content: string;
}

type FormData = SignInFormData | SignUpFormData | BoardFormData;

function generateInitialFormData(type: FormType): FormData {
  if (type === 'signIn')
    return {
      username: userIdFromLocalStorage.get() || '',
      password: '',
      isRememberId: !!userIdFromLocalStorage.get(),
    };
  else if (type === 'signUp')
    return {
      role: 'USER',
      username: '',
      password: '',
      passwordConfirm: '',
      contact: '',
      termOfUse: false,
      personalInformation: false,
    };
  else {
    return {
      title: '',
      content: '',
    };
  }
}

export function useForm<T extends FormData>(
  type: FormType
): [
  T,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (e: React.FormEvent<HTMLFormElement>) => void,
] {
  const [formData, setFormData] = useState<FormData>(() =>
    generateInitialFormData(type)
  );

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.currentTarget;
    const newValue = type === 'checkbox' ? checked : value;

    if (name === 'contact' && isNaN(Number(value))) return;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  }, []);

  /*
    - validation
      - signup
        - username : 최소 8자 이상
        - password : 영문, 특수기호, 숫자 중 2개 이상 조합하여 8~20자 사이
        - passwordConfirm : 비밀번호와 일치
        - contact : 010으로 시작하는 11자리 숫자
      - post
        - title : 최소 1자 이상
        - content : 최소 1자 이상
  */

  const submitSignInForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { isRememberId, username, password } = formData as SignInFormData;
      if (!isRememberId) userIdFromLocalStorage.remove();
      else userIdFromLocalStorage.set(username);
      console.log(formData);
    },
    [formData]
  );
  const submitSignUpForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { termOfUse, personalInformation } = formData as SignUpFormData;
      const agreement = [termOfUse, personalInformation];
      if (Object.values(agreement).includes(false))
        return alert('약관에 모두 동의해주세요.');
      alert(JSON.stringify(formData));
    },
    [formData]
  );
  const submitBoardForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { title, content } = formData as BoardFormData;
      alert(`title: ${title}, content: ${content}`);
    },
    [formData]
  );

  const onSubmit = {
    signIn: submitSignInForm,
    signUp: submitSignUpForm,
    board: submitBoardForm,
  };
  return [formData as T, onChange, onSubmit[type]];
}
