import Button from '@/components/common/Button';
import ProfileImage from './ProfileImage';
import { useRef, useState } from 'react';
import axios from 'axios';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ImageUploadModal({ isOpen, onClose }: ModalProps) {
  const [image, setImage] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement | null>(null);

  const handleImageDelete = () => {
    setImage(null);
    if (imgRef.current) {
      imgRef.current.value = ''; // 선택된 파일 초기화
    }
  };

  const handleImageUpload = async () => {
    if (!image) return;
    const file = imgRef.current?.files?.[0];
    if (!file) return;

    try {
      // 1. 서버에 Presigned URL 요청
      const response = await axios.post('/api/v1/patient/presigned', {
        imageName: file.name,
      });

      const presignedUrl = response.data;

      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      console.log('이미지 업로드 성공!');
    } catch (error) {
      console.error('이미지 업로드 실패', error);
    }
  };

  const handleImageChange = () => {
    const file = imgRef.current?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
  };

  const handleIconClick = () => {
    imgRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
      <div className="fixed min-h-5 rounded-lg bg-white px-5 py-5 shadow-lg">
        <Button
          className="absolute right-3 top-3 z-10 h-8 w-8 text-white hover:text-white"
          onClick={onClose}
        >
          X
        </Button>
        <section className="mt-5 flex h-[350px] w-[300px] flex-col items-center gap-8">
          <div className="flex h-[200px] w-[200px] items-center justify-center">
            {image ? (
              <div className="relative flex items-center justify-center">
                <img
                  src={image}
                  alt="Selected"
                  className="h-[200px] w-[200px] rounded-lg border-2 object-cover"
                />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  ref={imgRef}
                  onChange={handleImageChange}
                />
              </div>
            ) : (
              <div onClick={handleIconClick}>
                <ProfileImage />
                <input
                  type="file"
                  className="mt-4 hidden"
                  accept="image/*"
                  ref={imgRef}
                  onChange={handleImageChange}
                  id="profile"
                />
                <label
                  htmlFor="profile"
                  className="cursor-pointer text-text-large font-bold"
                >
                  프로필 이미지 편집
                </label>
              </div>
            )}
          </div>

          <div className="flex w-[200px] flex-col gap-3">
            <Button onClick={handleImageUpload}>이미지 적용하기</Button>
            <Button onClick={handleImageDelete} className="bg-red-500">
              이미지 삭제하기
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ImageUploadModal;
