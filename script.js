let palabras = [];
let indiceActual = 0;

const preguntaEl = document.getElementById("pregunta");
const opcionesEl = document.getElementById("opciones");
const feedbackEl = document.getElementById("feedback");
const siguienteBtn = document.getElementById("siguiente");
const volverInicioBtn = document.getElementById("volverInicio");

async function cargarDatos(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("No se pudo cargar el archivo");
    const data = await res.json();
    return data;
  } catch (error) {
    preguntaEl.textContent = "Error al cargar los datos.";
    console.error(error);
    return [];
  }
}

function mostrarPregunta() {
  if (indiceActual >= palabras.length) {
    preguntaEl.textContent = "¡Has terminado la lección!";
    opcionesEl.innerHTML = "";
    siguienteBtn.style.display = "none";
    return;
  }

  const item = palabras[indiceActual];
  preguntaEl.textContent = `¿Qué significa: "${item.palabra}"?`;

  let opciones = [item.significado];
  let otros = palabras
    .filter((_, i) => i !== indiceActual)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((p) => p.significado);

  opciones = opciones.concat(otros).sort(() => 0.5 - Math.random());

  opcionesEl.innerHTML = "";
  opciones.forEach((opcion) => {
    const btn = document.createElement("button");
    btn.textContent = opcion;
    btn.className = "opcion";
    btn.onclick = () => verificarRespuesta(opcion);
    opcionesEl.appendChild(btn);
  });

  feedbackEl.textContent = "";
  siguienteBtn.style.display = "none";
}

function verificarRespuesta(respuesta) {
  const correcto = palabras[indiceActual].significado;
  if (respuesta === correcto) {
    feedbackEl.textContent = "✅ Correcto!";
  } else {
    feedbackEl.textContent = `❌ Incorrecto. La respuesta correcta es: ${correcto}`;
  }
  siguienteBtn.style.display = "inline-block";

  Array.from(opcionesEl.children).forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correcto) btn.style.backgroundColor = "#00b894";
    else if (btn.textContent === respuesta) btn.style.backgroundColor = "#d63031";
  });
}

siguienteBtn.addEventListener("click", () => {
  indiceActual++;
  mostrarPregunta();
});

volverInicioBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

async function iniciar() {
  palabras = await cargarDatos("data3.json");
  if (palabras.length > 0) {
    mostrarPregunta();
  }
}

iniciar();

