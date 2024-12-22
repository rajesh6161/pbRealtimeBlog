import React, { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ children, showModal, setShowModal }) => {
  return (
    <div
      className="relative w-auto h-full"
      style={showModal ? { display: 'block' } : { display: 'none' }}
    >
      <div className="bg-gray-100 rounded-lg shadow relative max-h-[600px] overflow-y-auto border">
        <div className="flex justify-end p-2">
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={() => setShowModal(false)}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
