import SkeletonLoader from "./SkeletonLoader";
import SkeletonRectangle from "./SkeletonRectangle";

const SkeletonLeaderboard = () => {
  return (
    <div className="container mx-auto flex justify-center items-center">
      <SkeletonLoader className="flex gap-1 my-3 w-96">
        <SkeletonRectangle
          lines={2}
          gap={2}
          className="bg-gray-200 rounded-md"
        />
      </SkeletonLoader>
      <SkeletonLoader className="flex gap-1 my-3 w-96">
        <SkeletonRectangle
          lines={2}
          gap={2}
          className="bg-gray-200 rounded-md"
        />
      </SkeletonLoader>
      <SkeletonLoader className="flex gap-1 my-3 w-96">
        <SkeletonRectangle
          lines={2}
          gap={2}
          className="bg-gray-200 rounded-md"
        />
      </SkeletonLoader>
      <SkeletonLoader className="flex gap-1 my-3 w-96">
        <SkeletonRectangle
          lines={2}
          gap={2}
          className="bg-gray-200 rounded-md"
        />
      </SkeletonLoader>
    </div>
  );
};

export default SkeletonLeaderboard;
