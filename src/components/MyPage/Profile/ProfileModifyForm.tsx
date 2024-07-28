import Button from '@/components/common/Button';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import ProfileDetailForm from './ProfileDetailForm';
import { useProfile } from '@/hooks/useProfile';
import {
  ICaregiverData,
  ICaregiverEditData,
  IPatientData,
  IPatientEditData,
} from '@/types/api/profile';
import {
  addCaregiverToMatchList,
  addPatientToMatchList,
  getCaregiverProfile,
  getPatientProfile,
} from '@/api/profile.api';
import MatchingListControls from './MatchingListControls';

export interface IUserInfo {
  label: string;
  key: string;
  value: string | number;
  placeholder: string;
  type: 'text' | 'address' | 'textarea' | 'select' | 'zipCode' | 'date';
  options?: string[];
}

const patientInfoList: IUserInfo[] = [
  {
    label: '이름',
    key: 'name',
    value: '김환자',
    placeholder: '이름을 입력해주세요',
    type: 'text',
  },
  {
    label: '주민등록번호',
    key: 'residentRegistrationNumber',
    value: '',
    placeholder: '뒷번호 첫번째 자리까지 입력해주세요',
    type: 'text',
  },
  {
    label: '주소',
    key: 'address.addr',
    value: '',
    placeholder: '주소 찾기 버튼으로 검색해주세요',
    type: 'address',
  },
  {
    label: '상세 주소',
    key: 'address.addrDetail',
    value: '',
    placeholder: '상세 주소를 작성해주세요',
    type: 'text',
  },
  {
    label: '전화번호',
    key: 'contact',
    value: '',
    placeholder: '전화번호를 입력해주세요',
    type: 'text',
  },
  {
    label: '우편번호',
    key: 'address.zipCode',
    value: '',
    placeholder: '주소 찾기 버튼으로 검색해주세요',
    type: 'zipCode',
  },
  {
    label: '성별',
    key: 'gender',
    value: '남',
    placeholder: '성별을 선택해주세요',
    type: 'select',
    options: ['남', '여'],
  },
  {
    label: '보호자',
    key: 'nokName',
    value: '',
    placeholder: '보호자 이름을 입력해주세요',
    type: 'text',
  },
  {
    label: '간병 요구사항',
    key: 'careRequirements',
    value: '',
    placeholder: '요구사항을 작성해주세요',
    type: 'text',
  },
  {
    label: '보호자 전화번호',
    key: 'nokContact',
    value: '',
    placeholder: '전화번호를 입력해주세요',
    type: 'text',
  },
  {
    label: '환자 특이사항',
    key: 'patientSignificant',
    value: '',
    placeholder: '특이사항을 작성해주세요',
    type: 'text',
  },

  {
    label: '희망 간병 시작일',
    key: 'wantCareStartDate',
    value: '',
    placeholder: '희망하는 시작일을 선택해주세요',
    type: 'date',
  },
  {
    label: '간병 장소',
    key: 'realCarePlace',
    value: '',
    placeholder: '간병받을 장소를 입력해주세요',
    type: 'text',
  },
  {
    label: '희망 간병 종료일',
    key: 'wantCareEndDate',
    value: '',
    placeholder: '희망하는 종료일을 선택해주세요',
    type: 'date',
  },
];

const caregiverInfoList: IUserInfo[] = [
  {
    label: '이름',
    key: 'name',
    value: '김간병',
    placeholder: '이름을 입력해주세요',
    type: 'text',
  },
  {
    label: '주민등록번호',
    key: 'residentRegistrationNumber',
    value: '',
    placeholder: '뒷번호 첫번째 자리까지 입력해주세요',
    type: 'text',
  },
  {
    label: '주소',
    key: 'address.addr',
    value: '',
    placeholder: '주소 찾기 버튼으로 검색해주세요',
    type: 'address',
  },
  {
    label: '경력',
    key: 'experienceYears',
    value: '',
    placeholder: '경력을 입력해주세요',
    type: 'text',
  },
  {
    label: '상세 주소',
    key: 'address.addrDetail',
    value: '',
    placeholder: '상세 주소를 작성해주세요',
    type: 'text',
  },
  {
    label: '전화번호',
    key: 'contact',
    value: '',
    placeholder: '전화번호를 입력해주세요',
    type: 'text',
  },
  {
    label: '우편번호',
    key: 'address.zipCode',
    value: '',
    placeholder: '주소 찾기 버튼으로 검색해주세요',
    type: 'zipCode',
  },
  {
    label: '성별',
    key: 'gender',
    value: '남',
    placeholder: '성별을 선택해주세요',
    type: 'select',
    options: ['남', '여'],
  },
  {
    label: '등록증',
    key: 'caregiverSignificant',
    value: '',
    placeholder: '등록증 번호를 입력해주세요',
    type: 'text',
  },
  {
    label: '특이사항',
    key: 'specialization',
    value: '',
    placeholder: '특이사항을 작성해주세요',
    type: 'text',
  },
  {
    label: '희망 간병 시작일',
    key: 'wantCareStartDate',
    value: '',
    placeholder: '희망하는 시작일을 선택해주세요',
    type: 'date',
  },
  {
    label: '희망 간병 종료일',
    key: 'wantCareEndDate',
    value: '',
    placeholder: '희망하는 종료일을 선택해주세요',
    type: 'date',
  },
];

function ProfileModifyForm() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const {
    registerCaregiver,
    registerPatient,
    modifyCaregiverData,
    modifyPatientData,
    accessToken,
    role,
  } = useProfile();

  const [isEditMode, setIsEditMode] = useState(false);
  const [buttonLabel, setButtonLabel] = useState<string>('등록');
  const memberId = localStorage.getItem('memberId');

  useEffect(() => {
    if (memberId) {
      setButtonLabel('수정');
      // 역할에 따라 프로필 가져오기
      const fetchData = async () => {
        if (role === 'caregiver') {
          const profileData = await getCaregiverProfile(memberId, accessToken);
          reset(profileData.data);
        } else {
          const profileData = await getPatientProfile(memberId, accessToken);
          reset(profileData.data);
        }
      };
      fetchData();
    }
  }, [role, reset, getCaregiverProfile, getPatientProfile]);

  const onSubmit = async (data: ICaregiverData | IPatientData) => {
    console.log('입력한 데이터 형식', data);
    const isNok = !!(
      (data as IPatientData).nokName && (data as IPatientData).nokContact
    );
    const transformedData: ICaregiverData | IPatientData = {
      name: data.name,
      residentRegistrationNumber: data.residentRegistrationNumber,
      contact: data.contact,
      gender: data.gender === '남' ? 'MALE' : 'FEMALE',
      address: {
        addr: data.address.addr,
        addrDetail: data.address.addrDetail,
        zipCode: data.address.zipCode,
      },
      wantCareStartDate: new Date(data.wantCareStartDate).toISOString(),
      wantCareEndDate: new Date(data.wantCareEndDate).toISOString(),
      ...(role === 'caregiver'
        ? {
            experienceYears: (data as ICaregiverData).experienceYears,
            specialization: (data as ICaregiverData).specialization,
            caregiverSignificant: (data as ICaregiverData).caregiverSignificant,
          }
        : {
            patientSignificant: (data as IPatientData).patientSignificant,
            careRequirements: (data as IPatientData).careRequirements,
            realCarePlace: (data as IPatientData).realCarePlace,
            isNok,
            nokName: (data as IPatientData).nokName,
            nokContact: (data as IPatientData).nokContact,
          }),
    };

    const editedData: IPatientEditData | ICaregiverEditData = {
      address: {
        addr: data.address.addr,
        addrDetail: data.address.addrDetail,
        zipCode: data.address.zipCode,
      },
      wantCareStartDate: new Date(data.wantCareStartDate).toISOString(),
      wantCareEndDate: new Date(data.wantCareEndDate).toISOString(),
      ...(role === 'caregiver'
        ? {
            experienceYears: (data as ICaregiverEditData).experienceYears,
            specialization: (data as ICaregiverEditData).specialization,
            caregiverSignificant: (data as ICaregiverEditData)
              .caregiverSignificant,
          }
        : {
            patientSignificant: (data as IPatientEditData).patientSignificant,
            careRequirements: (data as IPatientEditData).careRequirements,
            realCarePlace: (data as IPatientEditData).realCarePlace,
            isNok,
            nokName: (data as IPatientEditData).nokName,
            nokContact: (data as IPatientEditData).nokContact,
          }),
    };

    if (buttonLabel === '등록') {
      if (role === 'caregiver' && registerCaregiver) {
        const response = await registerCaregiver(
          transformedData as ICaregiverData
        );
        console.log(response);
      } else if (role === 'patient' && registerPatient) {
        const response = await registerPatient(transformedData as IPatientData);
        console.log(response);
      }
    } else if (buttonLabel === '수정' && memberId) {
      if (role === 'caregiver' && modifyCaregiverData) {
        const response = await modifyCaregiverData(
          memberId,
          editedData as ICaregiverEditData
        );
        console.log('간병인 수정 완료:', response);
      } else if (role === 'patient' && modifyPatientData) {
        const response = await modifyPatientData(
          memberId,
          editedData as IPatientEditData
        );
        console.log('환자 수정 완료:', response);
      }
    }

    setIsEditMode(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    reset();
    setIsEditMode(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mb-12 flex flex-col gap-[65px] rounded-lg border p-[52px]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <FaUserCircle className="h-[90px] w-[90px] text-gray-medium" />
            <input
              className={`w-[70px] bg-transparent text-text-large outline-none ${
                isEditMode ? 'border-b-2' : 'border-transparent'
              } text-center`}
              {...register('name', { required: true })}
              type="text"
              disabled={!isEditMode}
            />
          </div>
          <span className="flex justify-end gap-4">
            {isEditMode ? (
              <>
                <Button
                  className="w-[100px] bg-gray-medium"
                  type="button"
                  onClick={handleCancel}
                >
                  취소
                </Button>
                <Button className="w-[100px] bg-red-500" type="submit">
                  저장
                </Button>
              </>
            ) : (
              <Button className="w-[100px]" type="button" onClick={handleEdit}>
                {buttonLabel}
              </Button>
            )}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-[15px]">
          {role === 'caregiver'
            ? caregiverInfoList.map(
                (item) =>
                  item.key !== 'name' && (
                    <dl
                      key={item.key}
                      className="flex w-[477px] flex-col gap-[19px]"
                    >
                      <dt className="flex w-full text-text-medium">
                        {item.label}
                      </dt>
                      <dd className="w-full flex-1 text-text-large">
                        <ProfileDetailForm
                          item={item}
                          register={register}
                          setValue={setValue}
                          isEditMode={isEditMode}
                        />
                      </dd>
                    </dl>
                  )
              )
            : patientInfoList.map(
                (item) =>
                  item.key !== 'name' && (
                    <dl
                      key={item.key}
                      className="flex w-[477px] flex-col gap-[19px]"
                    >
                      <dt className="flex w-full text-text-medium">
                        {item.label}
                      </dt>
                      <dd className="w-full flex-1 text-text-large">
                        <ProfileDetailForm
                          item={item}
                          register={register}
                          setValue={setValue}
                          isEditMode={isEditMode}
                        />
                      </dd>
                    </dl>
                  )
              )}
        </div>
        {/*todo: token에서 프로필 등록 여부에 따라 버튼 보여주기 */}
        <MatchingListControls />
      </form>
    </>
  );
}

export default ProfileModifyForm;
