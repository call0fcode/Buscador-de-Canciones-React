import React, { useState } from 'react';
import InfoBox from './UI/InfoBox';
import ReactLogo from '../assets/react-logo.svg';

const Formulario = ({ guardarBusquedaLetra }) => {
  const [busqueda, guardarBusqueda] = useState({
    artista: '',
    cancion: '',
  });
  const { artista, cancion } = busqueda;

  const [error, guardarError] = useState('');

  // Función para leer el contenido de cada input.
  const actualizarState = e => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  // Pasar datos de búsqueda al componente principal.
  const buscarInformacion = e => {
    e.preventDefault();

    // Validación.
    if (artista.trim() === '' || cancion.trim() === '') {
      guardarError('Todos los campos son obligatorios.');
      return;
    }

    // Se ha pasado la validación.
    guardarError('');
    guardarBusquedaLetra(busqueda);
  };

  return (
    <div className='bg-info'>
      {error && <InfoBox message={error} />}
      <div className='container'>
        <div className='row'>
          <form
            className='col card text-white bg-transparent mb-5 pt-5 pb-2'
            onSubmit={buscarInformacion}
          >
            <fieldset>
              <legend className='text-center'>Buscador de Canciones</legend>

              <p className='text-center lead'>
                Powered by
                <img src={ReactLogo} alt='Logo React' className='react-logo' />
              </p>

              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label htmlFor='artista'>Artista</label>
                    <input
                      type='text'
                      className='form-control'
                      name='artista'
                      id='artista'
                      placeholder='Nombre Artista'
                      onChange={actualizarState}
                      value={artista}
                    />
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='form-group'>
                    <label htmlFor='cancion'>Canción</label>
                    <input
                      type='text'
                      className='form-control'
                      name='cancion'
                      id='cancion'
                      placeholder='Nombre Canción'
                      onChange={actualizarState}
                      value={cancion}
                    />
                  </div>
                </div>
              </div>

              <button type='submit' className='btn btn-primary float-right'>
                Buscar
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
