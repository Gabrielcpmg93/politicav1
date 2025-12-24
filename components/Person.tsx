
import React from 'react';
import type { PersonData } from '../types';
import { PersonColor } from '../types';
import { ClockIcon, StarIcon } from './icons';

interface PersonComponentProps extends PersonData {
  isSelected: boolean;
  onClick: () => void;
}

const colorMap: Record<PersonColor, string> = {
  [PersonColor.Orange]: 'bg-orange-500',
  [PersonColor.Yellow]: 'bg-yellow-400',
  [PersonColor.LightGreen]: 'bg-lime-500',
  [PersonColor.DarkGreen]: 'bg-green-600',
  [PersonColor.Blue]: 'bg-blue-600',
  [PersonColor.Empty]: 'bg-transparent',
};

const Person: React.FC<PersonComponentProps> = ({ color, statusIcon, isSelected, onClick, name, party }) => {
  if (color === PersonColor.Empty) {
    return <div className="w-8 h-8" />;
  }

  const bgColor = colorMap[color];
  const selectionClasses = isSelected ? 'ring-4 ring-yellow-400 ring-offset-2 ring-offset-gray-500 rounded-lg' : '';
  const title = name && party ? `${name} (${party})` : 'Membro do Parlamento';

  return (
    <button onClick={onClick} title={title} className={`relative flex flex-col items-center w-8 focus:outline-none transition-all duration-200 ${selectionClasses}`}>
      <div className={`w-5 h-5 rounded-full ${bgColor} z-10 -mb-1 border-2 border-black/20`}></div>
      <div className={`w-8 h-4 ${bgColor} rounded-t-md`}></div>
      {statusIcon === 'clock' && (
        <div className="absolute -top-1 -right-1 z-20 bg-white rounded-full p-0.5 shadow">
          <ClockIcon className="w-4 h-4 text-blue-500" />
        </div>
      )}
      {statusIcon === 'star' && (
         <div className="absolute -bottom-1 -right-1 z-20">
          <StarIcon className="w-4 h-4 text-yellow-400" />
        </div>
      )}
    </button>
  );
};

export default Person;
