import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonButtons,
  IonMenuButton,
  IonIcon
} from '@ionic/react';
import { arrowBack, home, images } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

export default function RegistroMusical() {
  const history = useHistory();
  const [cancion, setCancion] = useState('');
  const [artista, setArtista] = useState('');
  const [genero, setGenero] = useState('');
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem('registrosMusicales')) || [];
    setRegistros(datos);
  }, []);

  const guardarRegistro = () => {
    if (cancion && artista) {
      const nuevo = { cancion, artista, genero, fecha: new Date().toLocaleDateString() };
      const nuevosRegistros = [...registros, nuevo];
      setRegistros(nuevosRegistros);
      localStorage.setItem('registrosMusicales', JSON.stringify(nuevosRegistros));
      setCancion('');
      setArtista('');
      setGenero('');
      alert('Registro guardado exitosamente!');
    } else {
      alert('Por favor, completa al menos canción y artista');
    }
  };

  const buttonStyle = {
    '--background': '#000000',
    '--color': '#ffffff',
    '--border-radius': '8px',
    fontWeight: '600'
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonButton onClick={() => history.goBack()} style={buttonStyle}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle style={{ color: '#000' }}>Registrar Canción</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/')} style={buttonStyle}>
              <IonIcon icon={home} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent style={{ padding: '10px' }}>
        <IonItem>
          <IonLabel position="floating">Canción *</IonLabel>
          <IonInput value={cancion} onIonChange={e => setCancion(e.detail.value)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Artista *</IonLabel>
          <IonInput value={artista} onIonChange={e => setArtista(e.detail.value)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Género</IonLabel>
          <IonInput value={genero} onIonChange={e => setGenero(e.detail.value)} />
        </IonItem>

        <IonButton expand="block" style={buttonStyle} onClick={guardarRegistro}>
          Guardar Registro
        </IonButton>

        <IonButton 
          expand="block" 
          fill="outline" 
          style={{ 
            marginTop: '10px', 
            '--border-color': '#000000',
            '--color': '#000000',
            fontWeight: '600'
          }}
          onClick={() => history.push('/galeria-musical')}
        >
          <IonIcon icon={images} slot="start" />
          Ver Galería Musical
        </IonButton>

        <h3 style={{ marginTop: '20px', color: '#000' }}>Registros Guardados:</h3>
        <IonList>
          {registros.map((r, i) => (
            <IonItem key={i}>
              <IonLabel>
                <h3>{r.cancion} - {r.artista}</h3>
                <p>{r.genero} • {r.fecha}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {registros.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '2rem', color: '#666' }}>
            <p>No hay registros guardados</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}