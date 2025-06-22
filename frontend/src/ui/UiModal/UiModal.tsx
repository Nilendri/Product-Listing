import React from 'react';
import './UiModal.css';

interface UiModalProps {
  onClose: () => void;
  children: React.ReactNode;
}
const UiModal: React.FC<UiModalProps> = ({ onClose, children }) => {
  return (
    <div className='modal-overlay'>
      <div className='modal-box'>
        <button onClick={onClose} className='close'>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export { UiModal };
