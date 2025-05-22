import React, { type ReactNode, useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[#1A1A1A] rounded-lg max-w-lg w-full mx-4 my-8 p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-10 bg-[#1A1A1A] rounded-full w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          aria-label="Закрыть"
        >
          ✕
        </button>
        <div className="pt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
