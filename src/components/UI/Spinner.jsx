import React from 'react';
import './Spinner.css';

const Spinner = ({ consultandoAPIs }) => {
  // Si no se está consultando la API no se renderiza el componente.
  if (!consultandoAPIs) return null;

  return (
    <div className='spinner'>
      <div className='bounce1'></div>
      <div className='bounce2'></div>
      <div className='bounce3'></div>
    </div>
  );
};

export default Spinner;
