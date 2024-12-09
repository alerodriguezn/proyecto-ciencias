import React from 'react';
import { Rabbit } from 'lucide-react';

interface RabbitPairProps {
  count: number;
  isActive?: boolean;
  onClick?: () => void;
}

export const RabbitPair: React.FC<RabbitPairProps> = ({
  count,
  isActive = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative w-24 h-24 flex flex-col items-center justify-center
        rounded-xl cursor-pointer transition-all duration-300
        ${
          isActive
            ? 'bg-green-100 border-2 border-green-500'
            : 'bg-white border-2 border-gray-200 hover:border-green-300'
        }
      `}
    >
      <div className="flex gap-1">
        <Rabbit className="w-8 h-8 text-gray-700" />
        <Rabbit className="w-8 h-8 text-gray-700" />
      </div>
      <span className="mt-2 text-lg font-bold text-gray-700">
        {count} {count === 1 ? 'pareja' : 'parejas'}
      </span>
    </div>
  );
};