import React from 'react';

interface NumberBlockProps {
  number: number;
  isActive?: boolean;
  onClick?: () => void;
}

export const NumberBlock: React.FC<NumberBlockProps> = ({
  number,
  isActive = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        w-16 h-16 flex items-center justify-center
        rounded-lg text-xl font-bold cursor-pointer
        transition-all duration-300 transform hover:scale-105
        ${
          isActive
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-indigo-600 shadow-md'
        }
      `}
    >
      {number}
    </div>
  );
};