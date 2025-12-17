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
  IonMenuButton
} from '@ionic/react';
import { star, calendar, arrowBack, home } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

export default function Eventos() {
  const history = useHistory();
  const eventos = [
    { nombre: 'Festival Electrónico 2025', fecha: '15 Ago 2025' },
    { nombre: 'Concierto Rock Legends', fecha: '22 Sep 2025' },
    { nombre: 'Jazz Night Live', fecha: '10 Oct 2025' },
    { nombre: 'Indie Summer Fest', fecha: '05 Nov 2025' },
  ];

  const [guardados, setGuardados] = useState(Array(eventos.length).fill(false));

  const toggleGuardado = (index) => {
    const nuevosGuardados = [...guardados];
    nuevosGuardados[index] = !nuevosGuardados[index];
    setGuardados(nuevosGuardados);
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
          <IonTitle style={{ color: '#ff4081', fontWeight: 'bold' }}>Eventos</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/')} style={buttonStyle}>
              <IonIcon icon={home} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ padding: '10px' }}>
        {eventos.map((ev, index) => (
          <IonCard key={index} style={{ marginBottom: '12px', backgroundColor: '#1c1c1c', borderRadius: '12px' }}>
            <IonCardHeader>
              <IonCardTitle style={{ color: '#fff', fontSize: '1rem' }}>{ev.nombre}</IonCardTitle>
              <IonCardSubtitle style={{ color: '#ff80ab', display: 'flex', alignItems: 'center' }}>
                <IonIcon icon={calendar} style={{ marginRight: '5px' }} />
                {ev.fecha}
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <IonButton fill="solid" color="dark" size="small" style={buttonStyle}>
                Asistir
              </IonButton>

              <IonButton
                fill="clear"
                color={guardados[index] ? 'danger' : 'light'}
                size="small"
                onClick={() => toggleGuardado(index)}
              >
                <IonIcon icon={star} />
              </IonButton>
            </IonCardContent>
          </IonCard>
        ))}

        <div style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <IonButton style={navButtonStyle} onClick={() => history.push('/top-canciones')}>
            Ver Top Canciones
          </IonButton>
          <IonButton style={navButtonStyle} onClick={() => history.push('/playlists')}>
            Ver Playlists
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}