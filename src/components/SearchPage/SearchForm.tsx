import Button from '../common/Button';
import { SearchFormData } from '@/types/formData.interface';
import { useForm, SubmitHandler } from 'react-hook-form';

type UserFormField = {
  index: string;
  key: keyof SearchFormData;
  array: (string | number)[];
};

const userForm: UserFormField[] = [
  {
    index: '시/도',
    key: 'city',
    array: [
      '지역 무관',
      '서울특별시',
      '대전광역시',
      '대구광역시',
      '부산광역시',
      '인천광역시',
    ],
  },
  {
    index: '시/군/구',
    key: 'city2',
    array: ['지역 무관', '강남구', '동작구', '관악구', '중구', '동대문구'],
  },
  {
    index: '성별',
    key: 'gender',
    array: ['성별 무관', '남', '여'],
  },
  {
    index: '나이',
    key: 'age',
    array: ['나이 무관', 30, 40, 50],
  },
  {
    index: '경력',
    key: 'career',
    array: ['경력 무관', 1, 3, 5, 10],
  },
];

function SearchForm() {
  const { register, handleSubmit } = useForm<SearchFormData>();
  const onSubmit: SubmitHandler<SearchFormData> = (data) => console.log(data);

  return (
    <form
      className="flex w-[390px] flex-col items-center justify-center gap-5 rounded-r-[15px] bg-chathams-blue px-10 shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      {userForm.map((item, index) => (
        <fieldset
          key={index}
          className="flex w-full items-center justify-between gap-5 px-5"
        >
          <label className="w-full text-text-large text-white">
            {item.index}
          </label>
          <select
            {...register(item.key, {
              required: true,
            })}
            className="w-full rounded-lg px-4 py-[10px]"
          >
            {item.array.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </fieldset>
      ))}
      <Button type="submit" className="w-full">
        검색
      </Button>
    </form>
  );
}

export default SearchForm;
