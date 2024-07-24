import { IUserInfo } from '@/pages/mypage/ProfilePage';
import FindAddressButton from '../FindAddressButton';
import { useForm } from 'react-hook-form';
import './ProfileDetailForm.css';
interface Props {
  item: IUserInfo;
  register: ReturnType<typeof useForm>['register'];
  setValue: ReturnType<typeof useForm>['setValue'];
  isEditMode: boolean;
}

function ProfileDetailForm({ item, register, setValue, isEditMode }: Props) {
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (item.key === 'residentRegistrationNumber') {
      let value = e.target.value.replace(/[^0-9]/g, '');
      if (value.length > 6) {
        value = `${value.slice(0, 6)}-${value.slice(6, 7)}******`;
      }
      setValue(item.key, value);
    } else {
      setValue(item.key, e.target.value);
    }

    if (item.key === 'contact' || item.key === 'nokContact') {
      let value = e.target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/-{1,2}$/g, '');
      setValue(item.key, value);
    } else {
      setValue(item.key, e.target.value);
    }
  };

  switch (item.type) {
    case 'text':
      return (
        <input
          placeholder={item.placeholder}
          {...register(item.key)}
          onChange={handleFormChange}
          type="text"
          disabled={!isEditMode}
          maxLength={13}
          className={`relative h-[48px] w-full rounded-[7px] border-2 bg-gray-light outline-none ${
            isEditMode ? '' : 'border-transparent'
          } pl-2`}
        />
      );
    case 'textarea':
      return (
        <textarea
          placeholder={item.placeholder}
          {...register(item.key)}
          disabled={!isEditMode}
          className={`relative h-[144px] w-[980px] rounded-[7px] border-2 bg-gray-light outline-none ${
            isEditMode ? '' : 'border-transparent'
          } pl-2`}
        />
      );
    case 'select':
      return (
        <select
          {...register(item.key)}
          disabled={!isEditMode}
          className={`relative h-[48px] rounded-[7px] border-2 bg-gray-light outline-none ${
            isEditMode ? '' : 'border-transparent'
          } w-full pl-2`}
        >
          {item.options &&
            item.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
      );
    case 'address':
      return (
        <div className="flex items-center">
          <input
            placeholder={item.placeholder}
            {...register(item.key)}
            type="text"
            disabled
            className={`relative h-[48px] rounded-[7px] border-2 bg-gray-light outline-none ${
              isEditMode ? '' : 'border-transparent'
            } w-full pl-2`}
          />
          {isEditMode && (
            <FindAddressButton
              onCompleted={(data) => {
                setValue('address.addr', data.address);
                setValue('address.zipCode', data.zonecode);
              }}
            />
          )}
        </div>
      );
    case 'zipCode':
      return (
        <div className="flex items-center">
          <input
            placeholder={item.placeholder}
            {...register(item.key)}
            type="text"
            disabled
            className={`relative h-[48px] rounded-[7px] border-2 bg-gray-light outline-none ${
              isEditMode ? '' : 'border-transparent'
            } w-full pl-2`}
          />
        </div>
      );
    case 'date':
      return (
        <div className="flex items-center">
          <input
            {...register(item.key)}
            type="date"
            disabled={!isEditMode}
            className={`h-[48px] rounded-[7px] border-2 bg-gray-light outline-none ${
              isEditMode ? '' : 'border-transparent'
            } w-full pl-2`}
          />
        </div>
      );
    default:
      return null;
  }
}

export default ProfileDetailForm;
