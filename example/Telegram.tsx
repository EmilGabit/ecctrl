import { useEffect, useState } from 'react';
import { WebApp } from '@twa-dev/sdk';

/**
 * Компонент для инициализации Telegram WebApp и отображения данных пользователя
 */
export const TelegramInit = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (typeof WebApp !== 'undefined') {
      WebApp.ready();
      WebApp.expand();
      
      // Сохраняем данные пользователя в состоянии
      if (WebApp.initDataUnsafe?.user) {
        setUserData({
          firstName: WebApp.initDataUnsafe.user.first_name,
          lastName: WebApp.initDataUnsafe.user.last_name,
          username: WebApp.initDataUnsafe.user.username,
          userId: WebApp.initDataUnsafe.user.id,
          languageCode: WebApp.initDataUnsafe.user.language_code,
          isPremium: WebApp.initDataUnsafe.user.is_premium || false
        });
      }
    } 
  }, []);

  // Если это не Telegram Mini App - не рендерим ничего
  if (typeof WebApp !== 'undefined') {

    return (
            <div>
            {userData ? (
                <p>{userData.username}</p>
            ) : (
                <p>Данные пользователя не получены</p>
            )}
            </div>
    );
  } else {
    return(    
    <div>
        <p>Хоть бы блять получилось</p>
    </div>)
  }  
};

/**
 * Хук для проверки, запущено ли приложение в Telegram.
 * @returns {boolean} true, если это Mini App.
 */
export const useTelegram = () => {
  return typeof WebApp !== 'undefined';
};

/**
 * Хук для доступа к данным пользователя Telegram.
 * @returns {object | null} Данные пользователя или null.
 */
export const useTelegramUser = () => {
  return WebApp?.initDataUnsafe?.user || null;
};

// function TelegramInit(){
//     return (
//         <>
//             <div>
//                 <p>Хоть бы блять получилось</p>
//             </div>
//         </>
//     );
// }

// export default TelegramInit;

  {/* <h3>Добро пожаловать, {userData.firstName}!</h3> */}
                
                // <p><strong>Имя:</strong> {userData.firstName} {userData.lastName}</p>
                
                //     <p><strong>ID:</strong> {userData.userId}</p>
                //     {userData.isPremium && <p>PREMIUM</p>}
                