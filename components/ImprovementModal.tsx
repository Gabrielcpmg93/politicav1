
import React from 'react';
import { BuildingIcon, SchoolIcon, HospitalIcon, SanitationIcon } from './icons';

type Effect = {
    supporters?: number;
    happiness?: number;
    approval?: number;
    expenses?: number;
};

type Improvement = {
    id: string;
    name: string;
    description: string;
    cost: number;
    effect: Effect;
    icon: React.ReactNode;
};

const improvements: Improvement[] = [
    { id: 'houses', name: 'Casas Populares', description: 'Melhora a qualidade de vida e aumenta sua base de apoio.', cost: 50, effect: { supporters: 1 }, icon: <BuildingIcon className="w-10 h-10 text-teal-300" /> },
    { id: 'schools', name: 'Escolas Públicas', description: 'População mais educada fica mais feliz.', cost: 75, effect: { happiness: 2 }, icon: <SchoolIcon className="w-10 h-10 text-purple-300" /> },
    { id: 'hospitals', name: 'Hospitais', description: 'Acesso à saúde aumenta a aprovação popular.', cost: 100, effect: { approval: 0.5 }, icon: <HospitalIcon className="w-10 h-10 text-red-300" /> },
    { id: 'sanitation', name: 'Saneamento Básico', description: 'Reduz despesas com saúde a longo prazo.', cost: 120, effect: { expenses: -1 }, icon: <SanitationIcon className="w-10 h-10 text-blue-300" /> }
];

interface ImprovementModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPurchase: (cost: number, effects: Effect, name: string) => void;
    playerMoney: number;
}

const ImprovementModal: React.FC<ImprovementModalProps> = ({ isOpen, onClose, onPurchase, playerMoney }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-700 text-white p-6 rounded-lg shadow-xl border-2 border-gray-600 w-full max-w-md mx-4 flex flex-col h-2/3">
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">Melhorar Infraestrutura</h2>
                <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                    {improvements.map(item => {
                        const canAfford = playerMoney >= item.cost;
                        return (
                            <div key={item.id} className="bg-gray-800 p-3 rounded-md border border-gray-600 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="mr-4 p-2 bg-black bg-opacity-20 rounded-md">{item.icon}</div>
                                    <div>
                                        <h3 className="font-bold text-md text-yellow-300">{item.name}</h3>
                                        <p className="text-xs text-gray-300">{item.description}</p>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0 ml-2">
                                    <p className="text-sm font-mono text-yellow-400">Custo: {item.cost}</p>
                                    <button
                                        onClick={() => onPurchase(item.cost, item.effect, item.name)}
                                        disabled={!canAfford}
                                        className="mt-1 px-3 py-1 text-sm bg-green-600 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed border-b-2 border-green-800 active:border-b-0"
                                    >
                                        Melhorar
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

export default ImprovementModal;
