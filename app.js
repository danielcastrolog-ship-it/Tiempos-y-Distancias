async function cargarCentros() {
  const url = "https://danielcastrolog-ship-it.github.io/Tiempos-y-Distancias/centros.json";

  const centros = await fetch(url).then(r => r.json());

  const origenSelect = document.getElementById("origen");
  const destinoSelect = document.getElementById("destino");

  centros.forEach(c => {
    const option1 = document.createElement("option");
    option1.value = c.id;
    option1.textContent = `${c.cliente} - ${c.centro}`;
    origenSelect.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = c.id;
    option2.textContent = `${c.cliente} - ${c.centro}`;
    destinoSelect.appendChild(option2);
  });
}
async function calcular() {
  const origen = document.getElementById("origen").value;
  const destino = document.getElementById("destino").value;
  const velocidad = document.getElementById("velocidad").value;

  const url =
    `https://tiempos-y-distancias.danielcastrolog.workers.dev?origen=${origen}&destino=${destino}&velocidad=${velocidad}`;

  const data = await fetch(url).then(r => r.json());

  mostrarResultado(data);
}
function mostrarResultado(data) {
  const div = document.getElementById("resultado");

  if (data.error) {
    div.innerHTML = `<p style="color:red">${data.error}</p>`;
    return;
  }

  div.innerHTML = `
    <h3>Resultado</h3>
    <p><strong>Origen:</strong> ${data.origen.cliente} - ${data.origen.centro}</p>
    <p><strong>Destino:</strong> ${data.destino.cliente} - ${data.destino.centro}</p>
    <p><strong>Distancia:</strong> ${data.distancia_nm} mn</p>
    <p><strong>Velocidad:</strong> ${data.velocidad_kn} kn</p>
    <p><strong>Tiempo estimado:</strong> ${data.tiempo_horas.toFixed(2)} horas</p>
  `;
}
