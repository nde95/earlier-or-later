type SkeletonCircleProps = {
  className?: string;
  size: number;
};

const SkeletonCircle = (props: SkeletonCircleProps) => {
  const className = props.className ?? "rounded-full flex-shrink-0 bg-gray-200";
  return (
    <div
      className={className}
      style={{ height: props.size, width: props.size }}
    />
  );
};
export default SkeletonCircle;
