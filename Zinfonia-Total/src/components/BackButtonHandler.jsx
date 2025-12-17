import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const BackButtonHandler = () => {
  const history = useHistory();

  useEffect(() => {
    const handleBackButton = (event) => {
      if (history.length > 1) {
        history.goBack();
        if (event && event.preventDefault) {
          event.preventDefault();
        }
      } else {
        // Prevenir el cierre inmediato
        if (event && event.preventDefault) {
          event.preventDefault();
        }
        
        // Opcional: Mostrar confirmación
        if (window.confirm('¿Presiona "Aceptar" para salir de la aplicación?')) {
          // Solo para entornos nativos
          if (typeof navigator !== 'undefined' && navigator.app && navigator.app.exitApp) {
            navigator.app.exitApp();
          }
        }
      }
    };

    // Para navegador
    const handlePopState = (event) => {
      handleBackButton(event);
    };

    window.addEventListener('popstate', handlePopState);

    // Para apps nativas (Cordova/Capacitor)
    if (typeof document !== 'undefined') {
      document.addEventListener('backbutton', handleBackButton, false);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (typeof document !== 'undefined') {
        document.removeEventListener('backbutton', handleBackButton, false);
      }
    };
  }, [history]);

  return null;
};

export default BackButtonHandler;