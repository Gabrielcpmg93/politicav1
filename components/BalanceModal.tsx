
import React from 'react';
import { BankIcon } from './icons';

interface BalanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    balance: number;
}

const BalanceModal: React.FC<BalanceModalProps> = ({ isOpen, onClose, balance }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-700 text-white p-6 rounded-lg shadow-xl border-2 border-gray-600 w-full max-w-sm mx-4">
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">Saldo Público</h2>
                <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-center space-x-4">
                    <BankIcon className="w-12 h-12 text-yellow-300" />
                    <span className="text-4xl font-mono font-bold text-white">{balance.toLocaleString()} M</span>
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

export default BalanceModal;
