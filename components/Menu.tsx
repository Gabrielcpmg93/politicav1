
import React, { useState } from 'react';
import { StarIcon, GlobeIcon, SettingsIcon } from './icons';

interface MenuProps {
  onStartGame: (year: number, party: string) => void;
  onOpenSettingsModal: () => void;
}

const parties = [
    { id: 'progressivists', name: 'Progressivistas', icon: <StarIcon className="w-8 h-8"/>, color: 'bg-red-500' },
    { id: 'traditionalists', name: 'Tradicionalistas', icon: <GlobeIcon className="w-8 h-8"/>, color: 'bg-blue-500' },
    { id: 'ecologists', name: 'Ecologistas', icon: <SettingsIcon className="w-8 h-8"/>, color: 'bg-green-500' }
];

const Menu: React.FC<MenuProps> = ({ onStartGame, onOpenSettingsModal }) => {
  const [year, setYear] = useState<number>(2026);
  const [selectedParty, setSelectedParty] = useState<string>('progressivists');

  return (
    <div className="w-[420px] h-[850px] bg-gray-700 flex flex-col justify-center items-center p-8 text-white font-bold shadow-2xl border-4 border-gray-800 rounded-2xl relative">
        <div className="absolute top-4 right-4">
            <button onClick={onOpenSettingsModal} className="p-2 bg-gray-600 rounded-full hover:bg-gray-500 transition-colors">
                <SettingsIcon className="w-8 h-8 text-gray-300" />
            </button>
        </div>
        <h1 className="text-5xl mb-4 text-yellow-400" style={{fontFamily: "'Georgia', serif"}}>Parliament Simulator</h1>
        <p className="text-lg text-gray-300 mb-12">Comece sua carreira política</p>

        <div className="w-full mb-10">
            <label htmlFor="year-slider" className="block text-2xl mb-2 text-center">Ano de Início: {year}</label>
            <input 
                id="year-slider"
                type="range"
                min="2024"
                max="2050"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value, 10))}
                className="w-full h-3 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
        </div>

        <div className="w-full mb-12">
            <h2 className="text-2xl mb-4 text-center">Escolha seu Partido</h2>
            <div className="flex justify-center space-x-4">
                {parties.map(party => (
                    <button 
                        key={party.id}
                        onClick={() => setSelectedParty(party.id)}
                        className={`
                            p-4 rounded-lg flex flex-col items-center justify-center border-4 transition-all
                            ${selectedParty === party.id ? 'border-yellow-400 scale-110' : 'border-transparent'}
                            ${party.color} hover:opacity-90
                        `}
                    >
                        <div className="mb-2">{party.icon}</div>
                        <span className="text-sm">{party.name}</span>
                    </button>
                ))}
            </div>
        </div>

        <button 
            onClick={() => onStartGame(year, selectedParty)}
            className="w-full py-4 bg-green-600 rounded-lg text-2xl hover:bg-green-700 transition-colors shadow-lg border-b-4 border-green-800 active:border-b-0"
        >
            Iniciar Jogo
        </button>
    </div>
  );
};

export default Menu;
