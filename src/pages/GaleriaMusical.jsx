import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonMenuButton,
  IonIcon
} from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { arrowBack, home, musicalNotes } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

export default function GaleriaMusical() {
  const history = useHistory();
  const [fotos, setFotos] = useState([]);
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const fotosGuardadas = JSON.parse(localStorage.getItem('fotosMusicales')) || [];
    const registrosGuardados = JSON.parse(localStorage.getItem('registrosMusicales')) || [];
    setFotos(fotosGuardadas);
    setRegistros(registrosGuardados);
  }, []);

  const tomarFoto = async () => {
    try {
      const foto = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      const nuevasFotos = [...fotos, foto.dataUrl];
      setFotos(nuevasFotos);
      localStorage.setItem('fotosMusicales', JSON.stringify(nuevasFotos));
    } catch (error) {
      console.error('Error al tomar foto:', error);
    }
  };

  const elegirArchivo = async () => {
    try {
      const foto = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });
      const nuevasFotos = [...fotos, foto.dataUrl];
      setFotos(nuevasFotos);
      localStorage.setItem('fotosMusicales', JSON.stringify(nuevasFotos));
    } catch (error) {
      console.error('Error al elegir archivo:', error);
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
          <IonTitle style={{ color: '#000' }}>Galería Musical</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/')} style={buttonStyle}>
              <IonIcon icon={home} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent style={{ padding: '10px' }}>
        <IonButton expand="block" onClick={tomarFoto} style={buttonStyle}>
          Tomar Foto
        </IonButton>
        <IonButton expand="block" onClick={elegirArchivo} style={buttonStyle}>
          Elegir del Celular
        </IonButton>

        <IonButton 
          expand="block" 
          style={buttonStyle}
          onClick={() => history.push('/registro-musical')}
        >
          <IonIcon icon={musicalNotes} slot="start" />
          Registrar Nueva Canción
        </IonButton>

        <h3 style={{ marginTop: '20px', color: '#000' }}>Fotos Guardadas:</h3>
        <IonList>
          {fotos.map((foto, i) => (
            <IonItem key={i}>
              <IonImg src={foto} style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }} />
              <IonLabel style={{ marginLeft: '10px', color: '#000' }}>
                {registros[i] ? `${registros[i].cancion} - ${registros[i].artista}` : `Foto ${i + 1}`}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {fotos.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '2rem', color: '#666' }}>
            <p>No hay fotos en la galería</p>
            <IonButton 
              style={buttonStyle}
              onClick={() => history.push('/registro-musical')}
            >
              Ir a Registrar Canción
            </IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}