import { init, miniApp, initDataUser } from '@telegram-apps/sdk';
import React from 'react';

interface TelegramMiniAppDetectorProps {
  fallback?: React.ReactNode;
}

const TelegramMiniAppDetector: React.FC<TelegramMiniAppDetectorProps> = ({ 
  fallback = <p>Это приложение работает только внутри Telegram Mini Apps.</p> 
}) => {
  const [isReady, setIsReady] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [username, setUsername] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      init();

      if (miniApp.ready.isAvailable()) {
        miniApp.ready();
        setIsReady(true);
        console.log('Mini App готово');
        console.log(initDataUser.username)
        // --- КОД ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ ПОЛЬЗОВАТЕЛЯ ---
        // Проверяем доступность информации о пользователе
        if (initDataUser.isAvailable()) {
          // Получаем данные пользователя
          const userData = initDataUser.get();
          // Извлекаем username (может быть null, если пользователь скрыл его)
          const tgUsername = userData.username;
          setUsername(tgUsername);
          console.log('Username пользователя:', tgUsername);
        }
        // --- КОНЕЦ КОДА ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ ---

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
    <div style={{ padding: '20px' }}>
      
      {username ? (
        <h1>{username}</h1>
      ) : (
        <h1>Не удалось получить username</h1>
      )}
    </div>
  );
};

export default TelegramMiniAppDetector;