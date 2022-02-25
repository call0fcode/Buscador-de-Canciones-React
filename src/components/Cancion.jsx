import React, { Fragment } from 'react';

const Cancion = ({ letra, fetching }) => {
  // No renderizar el componente si no hay letra que mostrar
  // o si se está consultando la API.
  if (!letra || fetching) return null;

  return (
    <Fragment>
      <h2>Letra Canción</h2>
      <p className='letra'>{letra}</p>
    </Fragment>
  );
};

export default Cancion;
