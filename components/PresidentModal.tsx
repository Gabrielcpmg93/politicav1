
import React from 'react';
import type { PersonData } from '../types';
import { PodiumPersonIcon } from './icons';

interface PresidentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectPresident: (personId: string) => void;
    parliamentarians: PersonData[];
}

const PresidentModal: React.FC<PresidentModalProps> = ({ isOpen, onClose, onSelectPresident, parliamentarians }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-700 text-white p-6 rounded-lg shadow-xl border-2 border-gray-600 w-full max-w-lg mx-4 flex flex-col h-4/5">
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">Eleger Presidente da Câmara</h2>
                <p className="text-sm text-gray-300 mb-4">Escolha um parlamentar para presidir a câmara. Um presidente do seu partido pode facilitar a aprovação de leis.</p>
                <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                    {parliamentarians.map(person => (
                        <div key={person.id} className="bg-gray-800 p-3 rounded-md border border-gray-600 flex items-center justify-between">
                            <div className="flex-grow">
                                <h3 className="font-bold text-md text-yellow-300">{person.name}</h3>
                                <p className="text-xs text-gray-400">{person.party}</p>
                                <div className="flex space-x-4 mt-2 text-xs">
                                    <span>Influência: <span className="font-bold text-blue-300">{person.influence}</span></span>
                                    <span>Lealdade: <span className="font-bold text-green-300">{person.loyalty}</span></span>
                                </div>
                            </div>
                            <button
                                onClick={() => onSelectPresident(person.id)}
                                className="ml-4 px-3 py-2 text-sm bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors border-b-2 border-indigo-800 active:border-b-0 flex items-center"
                            >
                                <PodiumPersonIcon className="w-5 h-5 mr-2"/>
                                Eleger
                            </button>
                        </div>
                    ))}
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

export default PresidentModal;
