import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonFab,
  IonFabButton,
  IonToast,
  IonButtons,
  IonMenuButton
} from '@ionic/react';
import { musicalNotesOutline, addOutline, arrowBack, home, star } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

export default function Playlists() {
  const history = useHistory();
  const [toastMsg, setToastMsg] = useState('');
  const [favorites, setFavorites] = useState([]);

  const genres = [
    { name: 'Pop', playlists: ['Pop Hits 2025', 'K-Pop Vibes', 'Pop Legends'], color: '#ff6a00' },
    { name: 'Rock', playlists: ['Rock Clásico', 'Rock Alternativo', 'Hard Rock Essentials'], color: '#4b6cb7' },
    { name: 'Electrónica', playlists: ['Electrónica Vibrante', 'EDM Party', 'Synthwave Hits'], color: '#11998e' },
    { name: 'Jazz', playlists: ['Jazz Lounge', 'Smooth Jazz', 'Jazz Classics'], color: '#fc4a1a' },
    { name: 'Indie', playlists: ['Indie Chill', 'Indie Vibes', 'Acoustic Indie'], color: '#8360c3' },
  ];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(stored);
  }, []);

  const handleSelectPlaylist = (pl) => {
    if (!favorites.includes(pl)) {
      const updated = [...favorites, pl];
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated));
    }
    setToastMsg(`Playlist agregada a favoritos: ${pl}`);
  };

  const buttonStyle = {
    '--background': '#000000',
    '--color': '#ffffff',
    '--border-radius': '8px',
    fontWeight: '600'
  };

  const navButtonStyle = {
    '--background': '#000000',
    '--color': '#ffffff',
    '--border-radius': '8px',
    margin: '0.3rem',
    fontWeight: '600'
  };

  return (
    <IonPage style={{ backgroundColor: '#f5f5f5' }}>
      <IonHeader>
        <IonToolbar style={{ backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonButton onClick={() => history.goBack()} style={buttonStyle}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle style={{ color: '#000', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <IonIcon icon={musicalNotesOutline} style={{ color: '#ff4081' }} /> 🎶 Playlists
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/')} style={buttonStyle}>
              <IonIcon icon={home} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          {genres.map((genre, index) => (
            <IonRow key={index} style={{ marginBottom: '1rem' }}>
              <IonCol size="12">
                <IonCard style={{ backgroundColor: genre.color, color: '#fff', borderRadius: '12px' }}>
                  <IonCardHeader>
                    <IonCardTitle style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{genre.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {genre.playlists.map((pl, idx) => (
                      <IonButton
                        key={idx}
                        expand="block"
                        fill="solid"
                        color="dark"
                        style={{ margin: '0.3rem 0', fontWeight: '600', '--background': '#000000' }}
                        onClick={() => handleSelectPlaylist(pl)}
                      >
                        {pl}
                      </IonButton>
                    ))}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>

        <div style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <IonButton style={navButtonStyle} onClick={() => history.push('/top-canciones')}>
            <IonIcon icon={star} slot="start" />
            Top Canciones
          </IonButton>
          <IonButton style={navButtonStyle} onClick={() => history.push('/eventos')}>
            Ver Eventos
          </IonButton>
        </div>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="dark" onClick={() => alert('Añadir nueva playlist')}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

        <IonToast
          isOpen={!!toastMsg}
          message={toastMsg}
          duration={2000}
          onDidDismiss={() => setToastMsg('')}
        />
      </IonContent>
    </IonPage>
  );
}