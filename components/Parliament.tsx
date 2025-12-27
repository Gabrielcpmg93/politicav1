
import React from 'react';
import type { ParliamentLayout } from '../types';
import Person from './Person';

interface ParliamentProps {
  layout: ParliamentLayout;
  selectedPersonId: string | null;
  onPersonClick: (id: string) => void;
  chamberPresidentId: string | null;
}

const Parliament: React.FC<ParliamentProps> = ({ layout, selectedPersonId, onPersonClick, chamberPresidentId }) => {
  return (
    <div className="w-full max-w-sm flex flex-col gap-1.5 p-2 z-10">
      {layout.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="h-12 bg-[#a0522d] rounded-md shadow-lg border-b-4 border-[#6f391f] flex justify-center items-center px-2"
        >
          <div className="flex justify-around w-full">
            {row.map((person) => (
              <Person 
                key={person.id} 
                {...person}
                statusIcon={person.id === chamberPresidentId ? 'star' : person.statusIcon}
                isSelected={selectedPersonId === person.id}
                onClick={() => onPersonClick(person.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Parliament;
