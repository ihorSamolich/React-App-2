import React from 'react';

interface IActionButtonProps {
  children: React.ReactNode;
  type: 'OK' | 'CANCEL';
  onClick?: () => void;
}

const ActionButton: React.FC<IActionButtonProps> = ({ children, onClick, type }) => {
  return (
    <button onClick={onClick} className={`${type === `OK` ? `text-green-500` : `text-red-600`}`}>
      {children}
    </button>
  );
};

export default ActionButton;
