
import React from 'react';
import { HourglassIcon, LawIcon } from './icons';

interface ControlsProps {
  onPassDay: () => void;
  onOpenLawModal: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onPassDay, onOpenLawModal }) => {
  return (
    <div className="bg-gray-500 p-2 h-[104px] flex items-end justify-center space-x-6">
      <button
        onClick={onOpenLawModal}
        className={`
          w-16 h-16 font-bold text-white rounded-lg shadow-md transition-all duration-200 flex items-center justify-center
          bg-blue-500 border-b-4 border-blue-700 hover:bg-blue-600 active:border-b-2
        `}
      >
        <LawIcon className="w-9 h-9 text-blue-100"/>
      </button>
      <button 
        onClick={onPassDay}
        className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center border-4 border-orange-700 shadow-lg hover:bg-orange-600 active:border-orange-500 transition-all">
        <HourglassIcon className="w-8 h-8 text-white" />
      </button>
    </div>
  );
};

export default Controls;
