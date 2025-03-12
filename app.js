const listaAmigos = document.getElementById('listaAmigos');
const inputAmigo = document.getElementById('amigo');
const amigos = [];
const resultado = document.getElementById('resultado');

function agregarAmigo() {
  const nombreAmigo = inputAmigo.value.trim();

  if (nombreAmigo !== '') {
    amigos.push(nombreAmigo);
    actualizarListaAmigos();
    inputAmigo.value = '';
    inputAmigo.focus(); // Colocar el cursor en el campo de entrada
    resultado.innerHTML = '';
  } else {
    resultado.innerHTML = '<li class="error-message">Favor agregar nombres válidos</li>';
  }
}

function actualizarListaAmigos() {
  listaAmigos.innerHTML = '';

  amigos.forEach((amigo) => {
    const nuevoAmigo = document.createElement('li');
    nuevoAmigo.textContent = amigo;
    listaAmigos.appendChild(nuevoAmigo);
  });
}

function sortearAmigo() {
  if (amigos.length < 2) {
    resultado.innerHTML = '<li class="error-message">Agrega al menos dos amigos para el sorteo.</li>';
    return;
  }

  const sorteo = realizarSorteo(amigos.slice());
  mostrarResultados(sorteo);
}

function realizarSorteo(amigos) {
  const sorteo = {};
  const amigosDisponibles = mezclarArray(amigos.slice());

  amigos.forEach((amigo) => {
    let amigoSecretoIndex;
    do {
      amigoSecretoIndex = Math.floor(Math.random() * amigosDisponibles.length);
    } while (amigosDisponibles[amigoSecretoIndex] === amigo);

    sorteo[amigo] = amigosDisponibles[amigoSecretoIndex];
    amigosDisponibles.splice(amigoSecretoIndex, 1);
  });

  return sorteo;
}

function mezclarArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function mostrarResultados(sorteo) {
  resultado.innerHTML = '';
  for (const amigo in sorteo) {
    const li = document.createElement('li');
    li.textContent = `${amigo} le regala a ${sorteo[amigo]}`;
    resultado.appendChild(li);
  }
}