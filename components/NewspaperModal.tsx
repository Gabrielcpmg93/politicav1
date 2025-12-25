
import React from 'react';
import type { NewsArticle } from '../types';

interface NewspaperModalProps {
    isOpen: boolean;
    onClose: () => void;
    newsFeed: NewsArticle[];
}

const NewspaperModal: React.FC<NewspaperModalProps> = ({ isOpen, onClose, newsFeed }) => {
    if (!isOpen) {
        return null;
    }

    const reversedNews = [...newsFeed].reverse();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div 
                className="bg-[#fdf5e6] text-black p-6 rounded-lg shadow-xl border-4 border-gray-800 w-full max-w-lg mx-4 flex flex-col h-4/5" 
                style={{ fontFamily: "'Times New Roman', serif" }}
            >
                <h2 className="text-4xl font-bold mb-2 text-center border-b-4 border-black pb-2">Diário do Parlamento</h2>
                <div className="flex-grow overflow-y-auto pr-2 space-y-4 mt-4">
                    {reversedNews.length > 0 ? (
                        reversedNews.map(article => (
                            <div key={article.id} className="border-b border-gray-400 pb-3">
                                <p className="text-xs text-gray-600 text-right">{`${String(article.day).padStart(2, '0')}/${String(article.month).padStart(2, '0')}/${article.year}`}</p>
                                <h3 className="font-bold text-xl mb-1">{article.headline}</h3>
                                <p className="text-sm text-gray-800 leading-relaxed">{article.body}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-center py-8 italic">Nenhuma notícia para reportar. O dia foi tranquilo no parlamento.</p>
                    )}
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors font-sans"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewspaperModal;
