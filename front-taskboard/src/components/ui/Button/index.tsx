import React from 'react';

interface IButtonProps {
  title: string;
  children: React.ReactNode;
  style?: 'BLUE' | 'WHITE' | 'TRANSPARENT';
  type?: 'submit' | 'button' | 'reset';
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({ children, title, style, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`flex items-center mb-2 sm:mb-0 justify-center w-full gap-1 sm:w-auto text-black rounded-sm px-3.5 py-1.5 text-sm font-semibold 
                ${
                  style === 'BLUE'
                    ? `bg-indigo-500 hover:bg-indigo-400 text-white`
                    : style === 'TRANSPARENT'
                      ? `bg-transparent text-gray-700 hover:text-black sm:w-full`
                      : `bg-white hover:bg-gray-200`
                }`}
    >
      {children}
      {title}
    </button>
  );
};

export default Button;
