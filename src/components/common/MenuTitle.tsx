import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
interface Props {
  title: string;
}

function MenuTitle({ title }: Props) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex items-center gap-1">
      <IoIosArrowBack
        onClick={handleBack}
        className="absolute left-[-40px] h-8 w-8 cursor-pointer"
      />
      <h1 className="w-max bg-gradient-to-r from-primary to-secondary pb-1 text-title-medium">
        <div className="h-full w-max bg-white pb-2">{title}</div>
      </h1>
    </div>
  );
}

export default MenuTitle;
