export default function ProgressBar({ inProgress }: { inProgress: boolean }) {
  const className = inProgress ? 'progress-bar painted' : 'progress-bar';
  return <div className={className}></div>;
}
