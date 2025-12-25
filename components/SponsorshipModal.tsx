
import React from 'react';
import { CoinIcon } from './icons';

type Sponsorship = {
    id: string;
    name: string;
    description: string;
    effects: {
        balance: number;
        happiness: number;
    };
};

const sponsorships: Sponsorship[] = [
    { 
        id: 'megacorp', 
        name: 'Oferta da MegaCorp', 
        description: 'Um "incentivo" para apoiar políticas favoráveis aos negócios.', 
        effects: { balance: 500, happiness: 0 } 
    },
    { 
        id: 'energyunlimited', 
        name: 'Doação da Energia Ilimitada', 
        description: 'Financiamento para "acelerar" projetos de energia.', 
        effects: { balance: 500, happiness: 0 } 
    },
];

interface SponsorshipModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: (effects: { balance: number, happiness: number }) => void;
}

const SponsorshipModal: React.FC<SponsorshipModalProps> = ({ isOpen, onClose, onAccept }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-700 text-white p-6 rounded-lg shadow-xl border-2 border-gray-600 w-full max-w-md mx-4">
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">Ofertas de Patrocínio</h2>
                <p className="text-sm text-gray-300 mb-4">Corporações estão oferecendo apoio financeiro em troca de influência. Aceitar pode trazer benefícios imediatos para seus cofres.</p>
                <div className="space-y-4">
                    {sponsorships.map(deal => (
                        <div key={deal.id} className="bg-gray-800 p-4 rounded-md border border-gray-600">
                            <h3 className="font-bold text-lg text-yellow-300">{deal.name}</h3>
                            <p className="text-sm text-gray-300 my-1">{deal.description}</p>
                            <div className="flex justify-between items-center mt-3">
                                <div className="text-sm font-mono">
                                    <span className="text-green-400">Receita: {deal.effects.balance}M</span>
                                    <span className={`ml-4 ${deal.effects.happiness < 0 ? 'text-red-400' : 'text-gray-400'}`}>Felicidade: {deal.effects.happiness}</span>
                                </div>
                                <button
                                    onClick={() => onAccept(deal.effects)}
                                    className="px-4 py-2 text-sm bg-pink-600 rounded-md hover:bg-pink-700 transition-colors border-b-2 border-pink-800 active:border-b-0 flex items-center"
                                >
                                    <CoinIcon className="w-5 h-5 mr-2" />
                                    Aceitar
                                </button>
                            </div>
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

export default SponsorshipModal;
