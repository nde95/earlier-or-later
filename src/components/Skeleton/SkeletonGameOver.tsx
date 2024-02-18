import SkeletonLoader from "./SkeletonLoader";
import SkeletonRectangle from "./SkeletonRectangle";

const SkeletonGameOver = () => {
  return (
    <div className="container mx-auto">
      <SkeletonLoader className="flex gap-1 my-3 w-96">
        <SkeletonRectangle
          lines={4}
          unEqualWidth
          gap={6}
          className="bg-gray-200 rounded-md"
        />
      </SkeletonLoader>
      <SkeletonLoader className="w-96">
        <SkeletonRectangle height={200} className="bg-gray-200 rounded-md" />
      </SkeletonLoader>
      <SkeletonLoader className="mt-5 flex justify-center items-center">
        <SkeletonRectangle
          lines={2}
          unEqualWidth
          className="bg-gray-200 rounded-md"
        />
      </SkeletonLoader>
    </div>
  );
};

export default SkeletonGameOver;
