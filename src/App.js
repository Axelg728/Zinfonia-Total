import React from 'react';
import { IonApp, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

function App() {
  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ZinfoniaTotal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        ¡Tu app Ionic React está lista!
      </IonContent>
    </IonApp>
  );
}

export default App;
