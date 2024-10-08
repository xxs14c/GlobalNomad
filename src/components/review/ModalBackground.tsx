import React from 'react';
import { ModalBackgroundProps } from '@/types/reviewModal';

const ModalBackground: React.FC<ModalBackgroundProps> = ({ onClose, children }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
    >
      {children}
    </div>
  );
};

export default ModalBackground;