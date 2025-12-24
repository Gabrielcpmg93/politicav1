
import React, { useState } from 'react';
import { PersonColor } from '../types';

type Party = {
  name: string;
  seats: number;
  color: PersonColor;
};

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  parties: Party[];
  onRunCampaign: (cost: number, potentialGain: number) => void;
}

const colorMap: Record<PersonColor, string> = {
  [PersonColor.Orange]: 'bg-orange-500',
  [PersonColor.Yellow]: 'bg-yellow-400',
  [PersonColor.LightGreen]: 'bg-lime-500',
  [PersonColor.DarkGreen]: 'bg-green-600',
  [PersonColor.Blue]: 'bg-blue-600',
  [PersonColor.Empty]: 'bg-transparent',
};

const campaignStrategies = [
    { name: 'Discurso Otimista', cost: 100, gain: 0.1, description: 'Foco em mensagens positivas e esperança.' },
    { name: 'Comícios Populares', cost: 250, gain: 0.25, description: 'Mobiliza as massas em eventos públicos.' },
    { name: 'Propaganda Agressiva', cost: 500, gain: 0.5, description: 'Ataca os oponentes diretamente. Alto risco, alta recompensa.' },
];

const CampaignModal: React.FC<CampaignModalProps> = ({ isOpen, onClose, parties, onRunCampaign }) => {
    const [view, setView] = useState<'options' | 'results'>('options');
    const [initialParties, setInitialParties] = useState<Party[]>([]);

    React.useEffect(() => {
        if(isOpen) {
            setView('options');
            setInitialParties(JSON.parse(JSON.stringify(parties)));
        }
    }, [isOpen]);

    const handleRun = (cost: number, gain: number) => {
        onRunCampaign(cost, gain);
        setView('results');
    };

    if (!isOpen) return null;

    const currentParties = view === 'options' ? initialParties : parties;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-gray-700 text-white p-6 rounded-lg shadow-xl border-2 border-gray-600 w-full max-w-lg mx-4">
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">Campanha Política</h2>
                <p className="text-gray-300 mb-6">É hora de garantir seu poder no parlamento! Os resultados definirão a nova composição dos 48 assentos.</p>

                {/* Seats Chart */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Assentos no Parlamento</h3>
                    <div className="w-full bg-gray-800 rounded-full h-8 flex overflow-hidden border-2 border-gray-600">
                        {currentParties.map((party, index) => (
                            <div
                                key={index}
                                className={`h-full flex items-center justify-center text-xs font-bold ${colorMap[party.color]}`}
                                style={{ width: `${(party.seats / 48) * 100}%` }}
                                title={`${party.name}: ${party.seats} assentos`}
                            >
                                {party.seats > 2 ? party.seats : ''}
                            </div>
                        ))}
                    </div>
                </div>

                {view === 'options' ? (
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Escolha sua Estratégia:</h3>
                        <div className="space-y-3">
                            {campaignStrategies.map(strategy => (
                                <button
                                    key={strategy.name}
                                    onClick={() => handleRun(strategy.cost, strategy.gain)}
                                    className="w-full text-left p-3 bg-gray-800 rounded-md border border-gray-600 hover:bg-gray-900 transition-colors"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-yellow-300">{strategy.name}</span>
                                        <span className="font-mono text-sm text-red-400">Custo: {strategy.cost}</span>
                                    </div>
                                    <p className="text-xs text-gray-400">{strategy.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-4 text-green-400">Campanha Concluída!</h3>
                        <p className="mb-6">O parlamento foi reconfigurado com base nos resultados. Veja a nova distribuição de poder.</p>
                        <button onClick={onClose} className="px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                            Continuar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CampaignModal;
