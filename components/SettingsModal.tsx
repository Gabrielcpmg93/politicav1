
import React from 'react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    volume: number;
    onVolumeChange: (volume: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, volume, onVolumeChange }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-700 text-white p-6 rounded-lg shadow-xl border-2 border-gray-600 w-full max-w-sm mx-4">
                <h2 className="text-3xl font-bold mb-6 text-yellow-400">Configurações</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="volume-slider" className="block text-sm font-medium text-gray-300 mb-2">
                            Volume da Música: <span className="font-bold text-yellow-400">{Math.round(volume * 100)}%</span>
                        </label>
                        <input
                            type="range"
                            id="volume-slider"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                            className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                        />
                    </div>
                </div>
                <div className="mt-8 flex justify-end">
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

export default SettingsModal;
