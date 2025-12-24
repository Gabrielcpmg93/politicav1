
import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        // Permitir que a animação de fade-out termine antes de chamar onClose
        setTimeout(onClose, 300);
      }, 3000); // Exibir por 3 segundos

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  const bgColor = type === 'success' ? 'bg-green-600 border-green-700' : 'bg-red-600 border-red-700';

  return (
    <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg text-white font-bold border-b-4 z-50 transition-all duration-300 ${bgColor} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {message}
    </div>
  );
};

export default Notification;
