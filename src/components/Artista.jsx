import React from 'react';
import { addProtocolToUrl, isValidHttpUrl } from '../helpers/validation';

const Artista = ({ info, fetching }) => {
  // No renderizar el componente si el objeto info está vacío
  // o se está consultando la API.
  if (Object.keys(info).length === 0 || fetching) return null;

  // Extraer propiedades de la info del artista.
  const {
    strArtist: nombre,
    strArtistThumb: foto,
    strGenre: genero,
    strBiographyES: biografia,
  } = info;

  // Posibles redes sociales del artista.
  const socialNetworks = {
    facebook: 'strFacebook',
    twitter: 'strTwitter',
    lastfm: 'strLastFMChart',
  };

  return (
    <div className='card border-light'>
      <div className='card-header bg-primary text-light font-weight-bold'>
        Información del Artista
      </div>
      <div className='card-body'>
        <img src={foto} alt={`Foto de ${nombre}`} />
        <p className='card-text'>Género: {genero}</p>
        <h2 className='card-text'>Biografía</h2>
        <p className='card-text biografia'>{biografia}</p>
        <div className='card-text'>
          {Object.entries(socialNetworks).map(socialNetwork => {
            if (isValidHttpUrl(addProtocolToUrl(info[socialNetwork[1]]))) {
              return (
                <a
                  key={socialNetwork[0]}
                  href={addProtocolToUrl(info[socialNetwork[1]])}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className={`fab fa-${socialNetwork[0]}`}></i>
                </a>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Artista;
