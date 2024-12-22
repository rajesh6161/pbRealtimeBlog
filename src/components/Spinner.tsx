import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
    </div>
  );
};

export default Spinner;
