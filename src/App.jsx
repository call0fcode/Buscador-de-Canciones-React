import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Artista from './components/Artista';
import InfoBox from './components/UI/InfoBox';
import Spinner from './components/UI/Spinner';

function App() {
  // States de la app
  const [busquedaLetra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState('');
  const [info, guardarInfo] = useState({});
  const [consultandoAPIs, guardarConsultandoAPIs] = useState(false);
  const [encontrado, guardarEncontrado] = useState({
    letra: '',
    artista: '',
  });

  // Acciones a ejecutar cuando recibimos del form un artista y una canción.
  useEffect(() => {
    // Si el objeto esta vacío, no se ejecuta ninguna acción.
    // Evita la ejecución con el primer renderizado del componente principal.
    if (Object.keys(busquedaLetra).length === 0) return;

    const consultarAPIs = async () => {
      const { artista, cancion } = busquedaLetra;
      const consultaAPILetras = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const consultaAPIArtistas = `https://theaudiodb.com/api/v1/json/2/search.php?s=${artista
        .split(' ')
        .join('_')}`;

      // Activar/mostrar el spinner de carga.
      guardarConsultandoAPIs(true);

      const fetchAPIsPromise = Promise.allSettled([
        axios(consultaAPILetras),
        axios(consultaAPIArtistas),
      ]);

      try {
        const [letraCancion, infoArtista] = await fetchAPIsPromise;

        // Ocultamos el spinner.
        guardarConsultandoAPIs(false);

        // Artista
        if (infoArtista.status === 'fulfilled') {
          if (infoArtista.value.data.artists === null) {
            guardarInfo({});
            guardarEncontrado(prevState => ({
              ...prevState,
              artista: 'Información del artista no encontrada.',
            }));
          } else {
            guardarEncontrado(prevState => ({
              ...prevState,
              artista: '',
            }));
            guardarInfo(infoArtista.value.data.artists[0]);
          }
        }

        // Letra
        if (letraCancion.status === 'fulfilled') {
          guardarEncontrado(prevState => ({
            ...prevState,
            letra: '',
          }));
          guardarLetra(letraCancion.value.data.lyrics);
        } else {
          // eslint-disable-next-line no-console
          console.clear();
          guardarLetra('');
          guardarEncontrado(prevState => ({
            ...prevState,
            letra: 'Canción no encontrada.',
          }));
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      } finally {
      }
    };

    consultarAPIs();
  }, [busquedaLetra]);

  return (
    <>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />
      <div className='container'>
        <Spinner consultandoAPIs={consultandoAPIs} />
        <div className='row'>
          <div className='col-md-6 mt-5'>
            <InfoBox message={encontrado.artista} fetching={consultandoAPIs} />
            <Artista info={info} fetching={consultandoAPIs} />
          </div>

          <div className='col-md-6 mt-5'>
            <InfoBox message={encontrado.letra} fetching={consultandoAPIs} />
            <Cancion letra={letra} fetching={consultandoAPIs} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
