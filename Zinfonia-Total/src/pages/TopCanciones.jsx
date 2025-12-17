import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonButtons,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
  IonLabel
} from '@ionic/react';
import { playOutline, pauseOutline, heart, arrowBack, home, musicalNotes } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

export default function TopCanciones() {
  const history = useHistory();
  const canciones = [
    { nombre: 'Blinding Lights', artista: 'The Weeknd' },
    { nombre: 'Levitating', artista: 'Dua Lipa' },
    { nombre: 'As It Was', artista: 'Harry Styles' },
    { nombre: 'Save Your Tears', artista: 'The Weeknd' },
    { nombre: 'Stay', artista: 'The Kid LAROI & Justin Bieber' },
  ];

  const [favoritos, setFavoritos] = useState(Array(canciones.length).fill(false));
  const [vista, setVista] = useState('todas'); // 'todas' o 'favoritos'
  const [reproduciendoIndex, setReproduciendoIndex] = useState(null); // índice de la canción “reproduciéndose”

  const toggleFavorito = (index) => {
    const nuevosFavoritos = [...favoritos];
    nuevosFavoritos[index] = !nuevosFavoritos[index];
    setFavoritos(nuevosFavoritos);
  };

  const toggleReproduccion = (index) => {
    // Si la misma canción está reproduciéndose, se detiene
    if (reproduciendoIndex === index) {
      setReproduciendoIndex(null);
    } else {
      setReproduciendoIndex(index);
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
    margin: '0.5rem',
    fontWeight: '600'
  };

  // Filtra las canciones según la vista
  const cancionesMostradas = vista === 'favoritos'
    ? canciones.filter((_, i) => favoritos[i])
    : canciones;

  return (
    <IonPage style={{ backgroundColor: '#0a0a0a' }}>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonMenuButton />
            <IonButton onClick={() => history.goBack()} style={buttonStyle}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle style={{ color: '#ff4081', fontWeight: 'bold' }}>Top Canciones</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/')} style={buttonStyle}>
              <IonIcon icon={home} />
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonToolbar color="dark">
          <IonSegment value={vista} onIonChange={e => setVista(e.detail.value)}>
            <IonSegmentButton value="todas">
              <IonLabel>Todas</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="favoritos">
              <IonLabel>Favoritos</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ padding: '10px' }}>
        {cancionesMostradas.length === 0 && vista === 'favoritos' && (
          <p style={{ color: '#fff', textAlign: 'center', marginTop: '1rem' }}>
            No hay canciones marcadas como favoritas
          </p>
        )}

        {cancionesMostradas.map((c, index) => {
          const i = vista === 'favoritos' ? canciones.indexOf(c) : index;
          const estaReproduciendo = reproduciendoIndex === i;

          return (
            <IonCard
              key={i}
              style={{
                marginBottom: '12px',
                backgroundColor: '#1c1c1c',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(255,64,129,0.3)',
              }}
            >
              <IonCardHeader>
                <IonCardTitle style={{ color: '#fff', fontSize: '1rem' }}>{c.nombre}</IonCardTitle>
                <IonCardSubtitle style={{ color: '#ff80ab', fontSize: '0.85rem' }}>{c.artista}</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <IonButton
                  fill="solid"
                  color="dark"
                  size="small"
                  style={buttonStyle}
                  onClick={() => toggleReproduccion(i)}
                >
                  <IonIcon icon={estaReproduciendo ? pauseOutline : playOutline} slot="start" />
                  {estaReproduciendo ? 'Reproduciendo' : 'Play'}
                </IonButton>

                <IonButton
                  fill="clear"
                  color={favoritos[i] ? 'danger' : 'light'}
                  size="small"
                  onClick={() => toggleFavorito(i)}
                >
                  <IonIcon icon={heart} />
                </IonButton>
              </IonCardContent>
            </IonCard>
          );
        })}

        <div style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <IonButton style={navButtonStyle} onClick={() => history.push('/playlists')}>
            <IonIcon icon={musicalNotes} slot="start" />
            Ver Playlists
          </IonButton>
          <IonButton style={navButtonStyle} onClick={() => history.push('/eventos')}>
            Ver Eventos
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
