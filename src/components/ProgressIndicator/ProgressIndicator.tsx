import ProgressBar from './ProgressBar';
import ProgressStep from './ProgressStep';

const progressStepLabelArray = [
  '간병인 작성',
  '환자 작성',
  '간병인 검토',
  '환자 검토',
];
const currentStep = 1;

export default function ProgressIndicator() {
  return (
    <div className="relative">
      <div className="flex items-start justify-between">
        {progressStepLabelArray.map((label, index) => (
          <ProgressStep
            key={label}
            stepIndex={index + 1}
            label={label}
            currentStep={currentStep}
          />
        ))}
      </div>
      <div className="absolute left-0 top-[13px] -z-10 flex w-full px-[60px]">
        {progressStepLabelArray.map((_, index) => {
          if (index === 0) return null;
          const isInProgress = currentStep > index;
          return <ProgressBar key={index} inProgress={isInProgress} />;
        })}
      </div>
    </div>
  );
}
