import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonButton,
  IonIcon,
  IonFooter,
  IonProgressBar,
  IonImg
} from '@ionic/react';
import { playOutline, pauseOutline, star, flame, musicalNotes, images, addCircle } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

export default function Bienvenida() {
  const history = useHistory();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
    if (!isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev + 0.01;
        });
      }, 100);
    }
  };

  const buttonStyle = {
    '--background': '#000',
    '--color': '#fff',
    '--border-radius': '8px',
    fontWeight: '600'
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>ZinfoníaTotal</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1>🎧 Tu Música, Tu Mundo</h1>
        <p>Explora playlists, descubre artistas y vive la experiencia ZinfoníaTotal.</p>

        <IonImg 
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
          alt="Música"
          style={{ width: '100%', borderRadius: '8px', margin: '1rem 0' }}
        />

        <IonButton expand="block" style={buttonStyle} onClick={() => history.push('/playlists')}>
          Empezar a Escuchar
        </IonButton>

        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <IonButton style={buttonStyle} onClick={() => history.push('/top-canciones')}>
            <IonIcon icon={star} slot="start" /> Top Canciones
          </IonButton>
          <IonButton style={buttonStyle} onClick={() => history.push('/eventos')}>
            <IonIcon icon={flame} slot="start" /> Eventos
          </IonButton>
          <IonButton style={buttonStyle} onClick={() => history.push('/registro-musical')}>
            <IonIcon icon={addCircle} slot="start" /> Registrar
          </IonButton>
          <IonButton style={buttonStyle} onClick={() => history.push('/galeria-musical')}>
            <IonIcon icon={images} slot="start" /> Galería
          </IonButton>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Acceso Rápido</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            <IonButton fill="outline" onClick={() => history.push('/playlists')}>
              <IonIcon icon={musicalNotes} slot="start" />
              Playlists
            </IonButton>
            <IonButton fill="outline" onClick={() => history.push('/galeria-musical')}>
              <IonIcon icon={images} slot="start" />
              Galería
            </IonButton>
          </div>
        </div>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div>
              <strong>Canción Simulada</strong>
              <p style={{ margin: 0, fontSize: '0.8rem' }}>Artista Ficticio</p>
            </div>
            <IonButton fill="clear" onClick={togglePlay}>
              <IonIcon icon={isPlaying ? pauseOutline : playOutline} />
            </IonButton>
          </div>
          <IonProgressBar value={progress} />
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}