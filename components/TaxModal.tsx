
import React, { useState, useEffect } from 'react';

type TaxRates = {
    income: number;
    corporate: number;
    sales: number;
};

interface TaxModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newRates: TaxRates) => void;
    currentRates: TaxRates;
}

const TaxModal: React.FC<TaxModalProps> = ({ isOpen, onClose, onSave, currentRates }) => {
    const [rates, setRates] = useState(currentRates);

    useEffect(() => {
        if (isOpen) {
            setRates(currentRates);
        }
    }, [currentRates, isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleSave = () => {
        onSave(rates);
        onClose();
    };

    const handleRateChange = (taxType: keyof TaxRates, value: number) => {
        setRates(prev => ({ ...prev, [taxType]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-700 text-white p-6 rounded-lg shadow-xl border-2 border-gray-600 w-full max-w-md mx-4">
                <h2 className="text-3xl font-bold mb-6 text-yellow-400">Gestão de Impostos</h2>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="income-tax" className="block text-sm font-medium text-gray-300 mb-2">
                            Imposto de Renda: <span className="font-bold text-yellow-400">{rates.income}%</span>
                            <p className="text-xs text-gray-400">Afeta a felicidade dos cidadãos.</p>
                        </label>
                        <input
                            type="range"
                            id="income-tax"
                            min="0"
                            max="30"
                            value={rates.income}
                            onChange={(e) => handleRateChange('income', parseInt(e.target.value, 10))}
                            className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                        />
                    </div>
                     <div>
                        <label htmlFor="corporate-tax" className="block text-sm font-medium text-gray-300 mb-2">
                            Imposto Corporativo: <span className="font-bold text-purple-400">{rates.corporate}%</span>
                             <p className="text-xs text-gray-400">Impacta a receita de grandes empresas.</p>
                        </label>
                        <input
                            type="range"
                            id="corporate-tax"
                            min="5"
                            max="40"
                            value={rates.corporate}
                            onChange={(e) => handleRateChange('corporate', parseInt(e.target.value, 10))}
                            className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                    </div>
                     <div>
                        <label htmlFor="sales-tax" className="block text-sm font-medium text-gray-300 mb-2">
                            Imposto sobre Vendas: <span className="font-bold text-teal-400">{rates.sales}%</span>
                             <p className="text-xs text-gray-400">Arrecadação sobre o consumo diário.</p>
                        </label>
                        <input
                            type="range"
                            id="sales-tax"
                            min="0"
                            max="15"
                            value={rates.sales}
                            onChange={(e) => handleRateChange('sales', parseInt(e.target.value, 10))}
                            className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                        />
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition-colors border-b-2 border-green-800 active:border-b-0"
                    >
                        Aplicar Mudanças
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaxModal;
