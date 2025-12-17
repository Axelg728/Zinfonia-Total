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
  IonToast,
  IonButtons,
  IonMenuButton
} from '@ionic/react';
import { musicalNotesOutline, arrowBack, home, star, chevronDown, chevronUp } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

export default function Playlists() {
  const history = useHistory();
  const [toastMsg, setToastMsg] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(true);

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

  // Toggle favorito: agrega o elimina
  const toggleFavorite = (pl) => {
    if (favorites.includes(pl)) {
      const updated = favorites.filter(f => f !== pl);
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setToastMsg(`Playlist eliminada de favoritos: ${pl}`);
    } else {
      const updated = [pl, ...favorites]; // agregar al inicio
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setToastMsg(`Playlist agregada a favoritos: ${pl}`);
    }
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

  const favoriteButtonStyle = {
    '--background': 'transparent',
    '--border-radius': '50%',
    padding: '0',
    minWidth: '36px',
    height: '36px'
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

        {/* Favoritos con toggle */}
        <IonCard style={{ marginBottom: '1rem', borderRadius: '12px' }}>
          <IonCardHeader onClick={() => setShowFavorites(!showFavorites)} style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
            <IonCardTitle style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>⭐ Favoritos ({favorites.length})</IonCardTitle>
            <IonIcon icon={showFavorites ? chevronUp : chevronDown} />
          </IonCardHeader>
          {showFavorites && favorites.length > 0 && (
            <IonCardContent>
              {favorites.map((fav, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: '500' }}>{fav}</span>
                  <IonButton style={favoriteButtonStyle} onClick={() => toggleFavorite(fav)}>
                    <IonIcon icon={star} color="warning" />
                  </IonButton>
                </div>
              ))}
              {favorites.length === 0 && <p style={{ color: '#888' }}>No hay favoritos</p>}
            </IonCardContent>
          )}
        </IonCard>

        {/* Playlists por género */}
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
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                        <span style={{ color: '#fff', fontWeight: '500' }}>{pl}</span>
                        <IonButton style={favoriteButtonStyle} onClick={() => toggleFavorite(pl)}>
                          <IonIcon icon={star} color={favorites.includes(pl) ? 'warning' : 'medium'} />
                        </IonButton>
                      </div>
                    ))}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>

        {/* Navegación a otras secciones */}
        <div style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <IonButton style={navButtonStyle} onClick={() => history.push('/top-canciones')}>
            <IonIcon icon={star} slot="start" />
            Top Canciones
          </IonButton>
          <IonButton style={navButtonStyle} onClick={() => history.push('/eventos')}>
            Ver Eventos
          </IonButton>
        </div>

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
