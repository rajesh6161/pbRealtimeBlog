// create a spinner in react using tailwind animation and fontawesome

import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
    </div>
  );
};

export default Spinner;
