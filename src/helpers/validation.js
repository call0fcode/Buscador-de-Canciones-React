function addProtocolToUrl(string) {
  // Si la cadena pasada empieza por www, añadirle el protocolo.
  if (/^www.*/.test(string)) {
    return 'https://' + string;
  }

  return string;
}

// Comprueba si la URL proporcionada es una URL válida.
// https://stackoverflow.com/a/43467144/6496579
function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

export { addProtocolToUrl, isValidHttpUrl };
