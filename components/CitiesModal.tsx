
import React from 'react';
import type { City } from '../types';
import { CityIcon, CoinIcon } from './icons';

interface CitiesModalProps {
    isOpen: boolean;
    onClose: () => void;
    cities: City[];
    onHelpCity: (cityId: string) => void;
    publicBalance: number;
}

const HELP_COST = 20;

const CitiesModal: React.FC<CitiesModalProps> = ({ isOpen, onClose, cities, onHelpCity, publicBalance }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-700 text-white p-6 rounded-lg shadow-xl border-2 border-gray-600 w-full max-w-lg mx-4 flex flex-col h-4/5">
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">Cidades do Estado</h2>
                <p className="text-sm text-gray-300 mb-4">Envie ajuda financeira para as cidades e melhore a vida dos seus cidadãos. Cada ajuda aumenta a felicidade geral.</p>
                <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                    {cities.map(city => {
                        const canAfford = publicBalance >= HELP_COST;
                        return (
                            <div key={city.id} className="bg-gray-800 p-3 rounded-md border border-gray-600 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="mr-4 p-2 bg-black bg-opacity-20 rounded-md">
                                        <CityIcon className="w-10 h-10 text-cyan-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-md text-yellow-300">{city.name}</h3>
                                        <p className="text-xs text-gray-400">Prefeito(a): {city.mayor}</p>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0 ml-2">
                                    <p className="text-sm font-mono text-yellow-400">Custo: {HELP_COST}M</p>
                                    <button
                                        onClick={() => onHelpCity(city.id)}
                                        disabled={!canAfford}
                                        className="mt-1 px-3 py-1 text-sm bg-green-600 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed border-b-2 border-green-800 active:border-b-0 flex items-center"
                                    >
                                        <CoinIcon className="w-4 h-4 mr-2"/>
                                        Ajudar
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CitiesModal;
