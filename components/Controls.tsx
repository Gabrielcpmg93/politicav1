
import React from 'react';
import { HourglassIcon, LawIcon, HandshakeIcon, MoneyBagIcon, ListIcon, BuildingIcon } from './icons';

interface ControlsProps {
  onPassDay: () => void;
  onOpenLawModal: () => void;
  onOpenApprovedLawsModal: () => void;
  onOpenImprovementModal: () => void;
  selectedPersonId: string | null;
  onConvince: () => void;
  onBribe: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onPassDay, onOpenLawModal, onOpenApprovedLawsModal, onOpenImprovementModal, selectedPersonId, onConvince, onBribe }) => {
  if (selectedPersonId) {
    return (
      <div className="bg-gray-500 p-2 h-[104px] flex items-center justify-center space-x-4">
        <button
          onClick={onConvince}
          className="w-32 h-16 font-bold text-white rounded-lg shadow-md transition-all duration-200 flex items-center justify-center px-2 bg-green-600 border-b-4 border-green-800 hover:bg-green-700 active:border-b-2"
        >
          <HandshakeIcon className="w-8 h-8 mr-2" />
          Convencer
        </button>
        <button
          onClick={onBribe}
          className="w-32 h-16 font-bold text-white rounded-lg shadow-md transition-all duration-200 flex items-center justify-center px-2 bg-red-600 border-b-4 border-red-800 hover:bg-red-700 active:border-b-2"
        >
          <MoneyBagIcon className="w-8 h-8 mr-2" />
          Subornar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-500 p-2 h-[104px] flex items-end justify-center space-x-2">
      <button
        onClick={onOpenImprovementModal}
        className={`
          w-16 h-16 font-bold text-white rounded-lg shadow-md transition-all duration-200 flex items-center justify-center
          bg-teal-600 border-b-4 border-teal-800 hover:bg-teal-700 active:border-b-2
        `}
      >
        <BuildingIcon className="w-9 h-9 text-teal-100"/>
      </button>
      <button
        onClick={onOpenApprovedLawsModal}
        className={`
          w-16 h-16 font-bold text-white rounded-lg shadow-md transition-all duration-200 flex items-center justify-center
          bg-gray-600 border-b-4 border-gray-800 hover:bg-gray-700 active:border-b-2
        `}
      >
        <ListIcon className="w-9 h-9 text-gray-100"/>
      </button>
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
