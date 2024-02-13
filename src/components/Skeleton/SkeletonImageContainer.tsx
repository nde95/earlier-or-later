import SkeletonLoader from "./SkeletonLoader";
import SkeletonRectangle from "./SkeletonRectangle";

const SkeletonImageContainer = () => {
  return (
    <div className="container mx-auto">
      <SkeletonLoader className="flex gap-1 my-3 w-96">
        <SkeletonRectangle
          lines={1}
          unEqualWidth
          gap={8}
          className="bg-gray-200 rounded-md"
        />
      </SkeletonLoader>
      <SkeletonLoader className="w-96">
        <SkeletonRectangle height={200} className="bg-gray-200 rounded-md" />
      </SkeletonLoader>
    </div>
  );
};

export default SkeletonImageContainer;
