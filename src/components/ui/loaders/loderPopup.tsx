import React from "react";

const LoaderPopup: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black border-opacity-75"></div>
    </div>
  );
};

export default LoaderPopup;
