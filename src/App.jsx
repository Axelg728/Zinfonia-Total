import React from 'react';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonRouterOutlet,
  setupIonicReact,
  IonIcon
} from '@ionic/react';
import { 
  homeOutline, 
  musicalNotesOutline, 
  starOutline, 
  calendarOutline, 
  addCircleOutline, 
  imagesOutline 
} from 'ionicons/icons';
import { Route, Redirect } from 'react-router-dom';

/* Páginas */
import Bienvenida from './pages/Bienvenida';
import Playlists from './pages/Playlists';
import TopCanciones from './pages/TopCanciones';
import Eventos from './pages/Eventos';
import RegistroMusical from './pages/RegistroMusical';
import GaleriaMusical from './pages/GaleriaMusical';

/* Componentes */
import BackButtonHandler from './components/BackButtonHandler';

/* Ionic CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

setupIonicReact();

export default function App() {
  return (
    <IonApp>
      <BackButtonHandler />
      
      <IonSplitPane contentId="main-content">
        <IonMenu contentId="main-content">
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>ZinfoníaTotal</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem routerLink="/" routerDirection="root">
                <IonIcon icon={homeOutline} slot="start" />
                Inicio
              </IonItem>
              <IonItem routerLink="/playlists" routerDirection="forward">
                <IonIcon icon={musicalNotesOutline} slot="start" />
                Playlists
              </IonItem>
              <IonItem routerLink="/top-canciones" routerDirection="forward">
                <IonIcon icon={starOutline} slot="start" />
                Top Canciones
              </IonItem>
              <IonItem routerLink="/eventos" routerDirection="forward">
                <IonIcon icon={calendarOutline} slot="start" />
                Eventos
              </IonItem>
              <IonItem routerLink="/registro-musical" routerDirection="forward">
                <IonIcon icon={addCircleOutline} slot="start" />
                Registrar Canción
              </IonItem>
              <IonItem routerLink="/galeria-musical" routerDirection="forward">
                <IonIcon icon={imagesOutline} slot="start" />
                Galería Musical
              </IonItem>
            </IonList>
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id="main-content">
          <Route path="/" component={Bienvenida} exact />
          <Route path="/playlists" component={Playlists} exact />
          <Route path="/top-canciones" component={TopCanciones} exact />
          <Route path="/eventos" component={Eventos} exact />
          <Route path="/registro-musical" component={RegistroMusical} exact />
          <Route path="/galeria-musical" component={GaleriaMusical} exact />
          <Redirect to="/" />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonApp>
  );
}