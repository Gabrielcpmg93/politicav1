
import React from 'react';
import { CoinIcon, PopulationIcon, SmileyIcon, GlobeIcon, SettingsIcon } from './icons';

interface HeaderProps {
  money: number;
  moneyChange: number;
  population: number;
  happiness: number;
}

const Header: React.FC<HeaderProps> = ({ money, moneyChange, population, happiness }) => {
  return (
    <header className="bg-gray-700 text-white shadow-md z-10">
      <div className="p-2 flex justify-between items-center">
        <div className="flex items-center space-x-4 text-sm font-bold">
          <div className="flex items-center bg-black bg-opacity-30 p-1 rounded">
            <CoinIcon className="w-8 h-8 text-yellow-400" />
            <div className="ml-1">
              <span>{money}</span>
              <span className="text-green-400 text-xs ml-1">↑{moneyChange}</span>
            </div>
          </div>
          <div className="flex items-center bg-black bg-opacity-30 p-1 rounded">
            <PopulationIcon className="w-8 h-8 text-blue-300" />
            <span className="ml-1">{population}</span>
          </div>
          <div className="flex items-center bg-black bg-opacity-30 p-1 rounded">
            <SmileyIcon className="w-8 h-8 text-green-400" />
            <span className="ml-1">{happiness}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-1 bg-gray-800 bg-opacity-50 rounded-md border border-gray-600 hover:bg-opacity-75">
            <GlobeIcon className="w-8 h-8 text-blue-400" />
          </button>
          <button className="p-1 bg-gray-800 bg-opacity-50 rounded-md border border-gray-600 hover:bg-opacity-75">
            <SettingsIcon className="w-8 h-8 text-gray-400" />
          </button>
        </div>
      </div>
      <div className="w-full bg-gray-800 bg-opacity-50 h-2">
        <div className="bg-green-500 h-2" style={{ width: `${happiness}%` }}></div>
      </div>
    </header>
  );
};

export default Header;
