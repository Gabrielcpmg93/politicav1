
import React from 'react';
import type { ParliamentLayout } from '../types';
import Person from './Person';

interface ParliamentProps {
  layout: ParliamentLayout;
}

const Parliament: React.FC<ParliamentProps> = ({ layout }) => {
  return (
    <div className="w-full max-w-sm flex flex-col gap-1.5 p-2">
      {layout.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="h-12 bg-[#a0522d] rounded-md shadow-lg border-b-4 border-[#6f391f] flex justify-center items-center px-2"
        >
          <div className="flex justify-around w-full">
            {row.map((person) => (
              <Person key={person.id} color={person.color} statusIcon={person.statusIcon} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Parliament;
