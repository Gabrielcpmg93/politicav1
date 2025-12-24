
import React from 'react';
import type { Law } from '../types';

interface ApprovedLawsModalProps {
    isOpen: boolean;
    onClose: () => void;
    laws: Law[];
}

const ApprovedLawsModal: React.FC<ApprovedLawsModalProps> = ({ isOpen, onClose, laws }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-700 text-white p-6 rounded-lg shadow-xl border-2 border-gray-600 w-full max-w-md mx-4 flex flex-col h-2/3">
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">Leis Aprovadas</h2>
                <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                    {laws.length > 0 ? (
                        laws.map(law => (
                            <div key={law.id} className="bg-gray-800 p-4 rounded-md border border-gray-600">
                                <h3 className="font-bold text-lg text-yellow-300">{law.name}</h3>
                                <p className="text-sm text-gray-300 my-1">{law.description}</p>
                                <p className="text-xs text-green-400 font-mono">Verba: {law.budget} Milhão</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center py-8">Nenhuma lei foi aprovada ainda.</p>
                    )}
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

export default ApprovedLawsModal;
