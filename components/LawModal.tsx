
import React from 'react';

interface LawModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProposeLaw: (name: string, description: string, budget: number) => void;
}

const LawModal: React.FC<LawModalProps> = ({ isOpen, onClose, onProposeLaw }) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [budget, setBudget] = React.useState(1);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = () => {
        if (name.trim() && description.trim()) {
            onProposeLaw(name, description, budget);
            setName('');
            setDescription('');
            setBudget(1);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-700 text-white p-6 rounded-lg shadow-xl border-2 border-gray-600 w-full max-w-md mx-4">
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">Propor Nova Lei</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="law-name" className="block text-sm font-medium text-gray-300 mb-1">Nome da Lei</label>
                        <input
                            type="text"
                            id="law-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Ex: Lei da Educação Universal"
                        />
                    </div>
                    <div>
                        <label htmlFor="law-description" className="block text-sm font-medium text-gray-300 mb-1">Descrição</label>
                        <textarea
                            id="law-description"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Descreva os objetivos e efeitos da lei..."
                        />
                    </div>
                    <div>
                        <label htmlFor="law-budget" className="block text-sm font-medium text-gray-300 mb-1">
                            Verba para a Lei: <span className="font-bold text-yellow-400">{budget} Milhão</span>
                        </label>
                        <input
                            type="range"
                            id="law-budget"
                            min="1"
                            max="50"
                            value={budget}
                            onChange={(e) => setBudget(parseInt(e.target.value, 10))}
                            className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!name.trim() || !description.trim()}
                        className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed border-b-2 border-green-800 active:border-b-0"
                    >
                        Enviar para Aprovação
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LawModal;
