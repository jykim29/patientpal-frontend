import Button from '@/components/common/Button';
import { useEffect, useState } from 'react';
import {
  SubmitHandler,
  UseFormRegister,
  UseFormSetValue,
  useForm,
} from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import ProfileDetailForm from './ProfileDetailForm';
import { useProfile } from '@/hooks/useProfile';
import {
  ICaregiverData,
  ICaregiverEditData,
  IPatientData,
  IPatientEditData,
} from '@/types/api/profile';
import { getCaregiverProfile, getPatientProfile } from '@/api/profile.api';
import MatchingListControls from './MatchingListControls';
import { useAuthStore } from '@/store/useAuthStore';
import {
  CaregiverInformation,
  GetUserDataResponse,
  PatientInformation,
} from '@/types/api/member';

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
    label: '나이',
    key: 'age',
    value: '',
    placeholder: '나이를 입력해주세요',
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
    label: '전화번호',
    key: 'contact',
    value: '',
    placeholder: '전화번호를 입력해주세요',
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
    label: '성별',
    key: 'gender',
    value: '남',
    placeholder: '성별을 선택해주세요',
    type: 'select',
    options: ['남', '여'],
  },
  {
    label: '우편번호',
    key: 'address.zipCode',
    value: '',
    placeholder: '주소 찾기 버튼으로 검색해주세요',
    type: 'zipCode',
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
    label: '나이',
    key: 'age',
    value: '',
    placeholder: '나이를 입력해주세요',
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
    key: 'specialization',
    value: '',
    placeholder: '등록증 번호를 입력해주세요',
    type: 'text',
  },
  {
    label: '특이사항',
    key: 'caregiverSignificant',
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
  const { register, handleSubmit, reset, setValue } =
    useForm<GetUserDataResponse>();
  const {
    registerCaregiver,
    registerPatient,
    modifyCaregiverData,
    modifyPatientData,
    role,
  } = useProfile();
  const [currentProfileInfo, setCurrentProfileInfo] = useState<
    GetUserDataResponse | {}
  >({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [buttonLabel, setButtonLabel] = useState<string>('등록');
  const [isInMatchList, setIsInMatchList] = useState<boolean>(false);
  const { user } = useAuthStore();
  console.log(user, user?.role);
  const memberId = user?.memberId;
  const isCompletedProfile: boolean = user?.isCompleteProfile ?? false;
  useEffect(() => {
    if (memberId === undefined) {
      throw new Error('memberId가 필요하다');
    }
    if (user && user.isCompleteProfile) {
      setCurrentProfileInfo({
        ...user,
        gender: user.gender === 'MALE' ? '남' : '여',
        wantCareEndDate: user.wantCareEndDate?.split('T')[0] || '',
        wantCareStartDate: user.wantCareStartDate?.split('T')[0] || '',
      });
    } else if (user && !user.isCompleteProfile) {
      setCurrentProfileInfo({
        ...user,
        gender: user.gender === null ? '남' : '여',
      });
    } else {
      throw new Error('프로필 정보 에러');
    }
    reset(currentProfileInfo);

    if (role === 'CAREGIVER' && isCompletedProfile) {
      setButtonLabel('수정');
      setIsInMatchList((user as CaregiverInformation).isProfilePublic);
    } else if (role === 'USER' && isCompletedProfile) {
      setButtonLabel('수정');
      setIsInMatchList((user as PatientInformation).isProfilePublic);
    }
  }, [role, reset, getCaregiverProfile, getPatientProfile]);

  const onSubmit: SubmitHandler<GetUserDataResponse> = async (data: any) => {
    const isNok = !!(
      (data as IPatientData).nokName && (data as IPatientData).nokContact
    );
    const transformedData: ICaregiverData | IPatientData = {
      name: data.name,
      age: data.age,
      contact: data.contact,
      gender: data.gender === '남' ? 'MALE' : 'FEMALE',
      address: {
        addr: data.address.addr,
        addrDetail: data.address.addrDetail,
        zipCode: data.address.zipCode,
      },
      wantCareStartDate: new Date(data.wantCareStartDate).toISOString(),
      wantCareEndDate: new Date(data.wantCareEndDate).toISOString(),
      ...(role === 'CAREGIVER'
        ? {
            experienceYears: Number((data as ICaregiverData).experienceYears),
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
      age: data.age,
      wantCareStartDate: new Date(data.wantCareStartDate).toISOString(),
      wantCareEndDate: new Date(data.wantCareEndDate).toISOString(),
      ...(role === 'CAREGIVER'
        ? {
            experienceYears: Number(
              (data as ICaregiverEditData).experienceYears
            ),
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
      if (role === 'CAREGIVER' && registerCaregiver) {
        const response = await registerCaregiver(
          transformedData as ICaregiverData
        );
        console.log(response);
      } else if (role === 'USER' && registerPatient) {
        const response = await registerPatient(transformedData as IPatientData);
        console.log(response);
      }
    } else if (buttonLabel === '수정' && memberId) {
      if (role === 'CAREGIVER' && modifyCaregiverData) {
        const response = await modifyCaregiverData(
          memberId,
          editedData as ICaregiverEditData
        );
        console.log('간병인 수정 완료:', response);
      } else if (role === 'USER' && modifyPatientData) {
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
  console.log(isEditMode);

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
              className={`bg-transparent text-start text-text-large outline-none`}
              {...register('name', { required: true })}
              type="text"
              disabled={!isEditMode}
              placeholder="이름을 입력해주세요"
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
          {role === 'CAREGIVER'
            ? caregiverInfoList.map(
                (item) =>
                  item.key !== 'name' && (
                    <dl
                      key={item.key}
                      className="flex w-[477px] flex-col gap-[19px]"
                    >
                      <dt className="flex w-full text-text-medium">
                        <label htmlFor={item.key}>{item.label}</label>
                      </dt>
                      <dd className="w-full flex-1 text-text-large">
                        {/* 수정할때 다른 값도 수정되는 문제 */}
                        <ProfileDetailForm
                          item={item}
                          register={
                            register as UseFormRegister<GetUserDataResponse>
                          }
                          setValue={
                            setValue as UseFormSetValue<GetUserDataResponse>
                          }
                          isEditMode={isEditMode}
                          isCompletedProfile={isCompletedProfile}
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
                        <label htmlFor={item.key}>{item.label}</label>
                      </dt>
                      <dd className="w-full flex-1 text-text-large">
                        <ProfileDetailForm
                          item={item}
                          register={register}
                          setValue={setValue}
                          isEditMode={isEditMode}
                          buttonLabel={buttonLabel}
                          isCompletedProfile={isCompletedProfile}
                        />
                      </dd>
                    </dl>
                  )
              )}
        </div>
        {isCompletedProfile && (
          <MatchingListControls
            isInMatchList={isInMatchList}
            setIsInMatchList={setIsInMatchList}
          />
        )}
      </form>
    </>
  );
}

export default ProfileModifyForm;
