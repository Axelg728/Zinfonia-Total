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
import { star, calendar, arrowBack, home, checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

export default function Eventos() {
  const history = useHistory();
  const eventos = [
    { nombre: 'Festival Electrónico 2025', fecha: '15 Ago 2025' },
    { nombre: 'Concierto Rock Legends', fecha: '22 Sep 2025' },
    { nombre: 'Jazz Night Live', fecha: '10 Oct 2025' },
    { nombre: 'Indie Summer Fest', fecha: '05 Nov 2025' },
  ];

  const [guardados, setGuardados] = useState([]);
  const [asistencia, setAsistencia] = useState([]);
  const [vista, setVista] = useState('todos'); // 'todos', 'guardados', 'asistir'

  // Cargar datos de localStorage al iniciar
  useEffect(() => {
    const savedGuardados = JSON.parse(localStorage.getItem('eventosGuardados')) || Array(eventos.length).fill(false);
    const savedAsistencia = JSON.parse(localStorage.getItem('eventosAsistencia')) || Array(eventos.length).fill(false);
    setGuardados(savedGuardados);
    setAsistencia(savedAsistencia);
  }, []);

  const toggleGuardado = (index) => {
    const nuevosGuardados = [...guardados];
    nuevosGuardados[index] = !nuevosGuardados[index];
    setGuardados(nuevosGuardados);
    localStorage.setItem('eventosGuardados', JSON.stringify(nuevosGuardados));
  };

  const toggleAsistencia = (index) => {
    const nuevaAsistencia = [...asistencia];
    nuevaAsistencia[index] = !nuevaAsistencia[index];
    setAsistencia(nuevaAsistencia);
    localStorage.setItem('eventosAsistencia', JSON.stringify(nuevaAsistencia));
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

  // Filtra los eventos según la vista seleccionada
  const eventosMostrados = eventos.filter((_, i) => {
    if (vista === 'todos') return true;
    if (vista === 'guardados') return guardados[i];
    if (vista === 'asistir') return asistencia[i];
    return true;
  });

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

        {/* Segmento para cambiar la vista */}
        <IonToolbar color="dark">
          <IonSegment value={vista} onIonChange={e => setVista(e.detail.value)}>
            <IonSegmentButton value="todos">
              <IonLabel>Todos</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="guardados">
              <IonLabel>Guardados</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="asistir">
              <IonLabel>Asistiré</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ padding: '10px' }}>
        {eventosMostrados.length === 0 && (
          <p style={{ color: '#fff', textAlign: 'center', marginTop: '1rem' }}>
            {vista === 'guardados' && 'No hay eventos guardados'}
            {vista === 'asistir' && 'No hay eventos a los que asistirás'}
            {vista === 'todos' && 'No hay eventos disponibles'}
          </p>
        )}

        {eventosMostrados.map((ev, index) => {
          const i = eventos.indexOf(ev); // índice real en los arrays de guardados/asistencia

          return (
            <IonCard key={i} style={{ marginBottom: '12px', backgroundColor: '#1c1c1c', borderRadius: '12px' }}>
              <IonCardHeader>
                <IonCardTitle style={{ color: '#fff', fontSize: '1rem' }}>{ev.nombre}</IonCardTitle>
                <IonCardSubtitle style={{ color: '#ff80ab', display: 'flex', alignItems: 'center' }}>
                  <IonIcon icon={calendar} style={{ marginRight: '5px' }} />
                  {ev.fecha}
                </IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <IonButton
                  fill="solid"
                  color={asistencia[i] ? 'success' : 'dark'}
                  size="small"
                  style={buttonStyle}
                  onClick={() => toggleAsistencia(i)}
                >
                  {asistencia[i] ? (
                    <>
                      <IonIcon icon={checkmarkCircleOutline} slot="start" />
                      Asistiré
                    </>
                  ) : (
                    <>
                      <IonIcon icon={closeCircleOutline} slot="start" />
                      Asistir
                    </>
                  )}
                </IonButton>

                <IonButton
                  fill="clear"
                  color={guardados[i] ? 'danger' : 'light'}
                  size="small"
                  onClick={() => toggleGuardado(i)}
                >
                  <IonIcon icon={star} />
                </IonButton>
              </IonCardContent>
            </IonCard>
          );
        })}

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
