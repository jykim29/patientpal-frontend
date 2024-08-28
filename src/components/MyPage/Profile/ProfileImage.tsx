import { FaUserCircle } from 'react-icons/fa';
import { FaCamera } from 'react-icons/fa6';

function ProfileImage() {
  return (
    <div className="relative flex cursor-pointer flex-col items-center">
      <span className="absolute bottom-3 right-3 flex h-[35px] w-[35px] items-center justify-center rounded-full border-2 bg-white">
        <FaCamera className="z-50" />
      </span>
      <FaUserCircle className="h-[150px] w-[150px] text-gray-medium" />
    </div>
  );
}

export default ProfileImage;
