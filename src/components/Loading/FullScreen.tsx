import { LoadingSpinner } from "../ui/loading";

export const FullScreenLoader = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <LoadingSpinner className="h-16 w-16 text-primary" /> {/* Adjust size and color as needed */}
      </div>
    );
  };