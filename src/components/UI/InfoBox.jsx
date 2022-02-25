import React from 'react';

const InfoBox = ({ message, fetching }) => {
  // No renderizar el componente si no hay mensaje que mostrar
  // o si se está consultando la API.
  if (!message || fetching) return null;

  return <p className='alert alert-danger text-center p-2'>{message}</p>;
};

export default InfoBox;
