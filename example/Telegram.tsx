import { init, miniApp } from '@telegram-apps/sdk';
import React from 'react';

interface TelegramMiniAppDetectorProps {
  // Можно добавить дополнительные пропсы при необходимости
  fallback?: React.ReactNode; // Опциональный fallback UI
}

const TelegramMiniAppDetector: React.FC<TelegramMiniAppDetectorProps> = ({ 
  fallback = <p>Это приложение работает только внутри Telegram Mini Apps.</p> 
}) => {
  const [isReady, setIsReady] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      init();

      if (miniApp.ready.isAvailable()) {
        miniApp.ready();
        setIsReady(true);
        console.log('Mini App готово');
      } else {
        setError('Telegram Mini App не обнаружен');
      }
    } catch (err) {
      console.error('Ошибка инициализации:', err);
      setError('Ошибка при подключении к Telegram');
    }
  }, []);

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Ошибка</h2>
        {fallback}
        <p><small>{error}</small></p>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default TelegramMiniAppDetector;