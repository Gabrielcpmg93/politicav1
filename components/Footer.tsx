
import React from 'react';
import { PeopleGroupIcon, GreenMoneyBillIcon, GrayMoneyBillIcon } from './icons';
import AnimatedNumber from './AnimatedNumber';

interface FooterProps {
  supporters: number;
  income: number;
  incomeChange: number;
  expenses: number;
  approval: number;
  lawsPassed: number;
  year: number;
  day: number;
}

const Footer: React.FC<FooterProps> = ({
  supporters,
  income,
  incomeChange,
  expenses,
  approval,
  lawsPassed,
  year,
  day,
}) => {
  return (
    <footer className="bg-gray-700 p-2 flex items-center justify-center text-white font-semibold">
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center">
          <PeopleGroupIcon className="w-6 h-6 text-green-400" />
          <span className="text-sm">{supporters}</span>
        </div>
        <div className="flex flex-col items-center">
          <GreenMoneyBillIcon className="w-6 h-6 text-green-400" />
          <span className="text-sm">{income}<span className="text-green-400 text-xs">↑{incomeChange}</span></span>
        </div>
        <div className="flex flex-col items-center">
          <GrayMoneyBillIcon className="w-6 h-6 text-gray-400" />
          <span className="text-sm">{expenses}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg">%</span>
          <span className="text-sm">{approval.toFixed(2)}</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span className="text-sm">{lawsPassed} Leis</span>
          <div className="flex items-center text-sm font-bold">
            <AnimatedNumber value={day} className="w-5 text-right" />
            <span>/28</span>
            <AnimatedNumber value={year} className="ml-2" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
