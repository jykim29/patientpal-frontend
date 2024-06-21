export default function ProgressStep({
  stepIndex,
  label,
  currentStep,
}: {
  stepIndex: number;
  label: string;
  currentStep: number;
}) {
  let progressState = 'in-progress';
  if (currentStep < stepIndex) progressState = 'todo';
  if (currentStep > stepIndex) progressState = 'done';
  const animateClassName =
    progressState === 'in-progress'
      ? 'step-outer-circle animated'
      : 'step-outer-circle';

  return (
    <div className="steps-container">
      <div className={animateClassName}>
        <div className={`step-inner-circle ${progressState}`}>
          <span className="step-count">{stepIndex}</span>
        </div>
      </div>
      <span className={`step-label ${progressState}`}>{label}</span>
    </div>
  );
}
