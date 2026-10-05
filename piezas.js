/* Piezas y precios DE EJEMPLO para la demo. No son de ninguna joyería real.
   En la versión real, cada joyero carga su catálogo y captura su precio del gramo. */
window.DEMO = {
  negocio: "Joyería de ejemplo",
  ciudad: "Guadalajara, Jal.",
  // Precio por gramo de ejemplo (MXN). El joyero los cambia cada mañana en el panel.
  precios: { "10k": 1450, "14k": 2050, "925": 45 },
  minimo: 3000,
  metales: {
    "10k": { nombre: "Oro 10k", ley: "417 milésimas", tono: "oro" },
    "14k": { nombre: "Oro 14k", ley: "585 milésimas", tono: "oro" },
    "925": { nombre: "Plata .925", ley: "925 milésimas", tono: "plata" }
  },
  piezas: [
    { id: "AR-018", nombre: "Arracada lisa 18 mm", metal: "10k", peso: 1.8, forma: "arracada" },
    { id: "BR-004", nombre: "Broquel bolita 4 mm", metal: "14k", peso: 0.6, forma: "broquel" },
    { id: "CA-050", nombre: "Cadena cartier 50 cm", metal: "10k", peso: 4.2, forma: "cadena" },
    { id: "ES-210", nombre: "Esclava tejida", metal: "14k", peso: 6.5, forma: "esclava" },
    { id: "AN-031", nombre: "Anillo churumbela", metal: "14k", peso: 2.4, forma: "anillo" },
    { id: "DI-112", nombre: "Dije medalla", metal: "10k", peso: 1.5, forma: "dije" },
    { id: "CA-145", nombre: "Cadena torzal 45 cm", metal: "925", peso: 6.0, forma: "cadena" },
    { id: "AR-207", nombre: "Arracada huggie con circonia", metal: "925", peso: 2.2, forma: "arracada" },
    { id: "AN-090", nombre: "Anillo sello", metal: "10k", peso: 5.1, forma: "anillo" },
    { id: "BR-033", nombre: "Broquel corazón", metal: "10k", peso: 0.9, forma: "broquel" },
    { id: "PU-084", nombre: "Pulsera rolo", metal: "925", peso: 8.4, forma: "esclava" },
    { id: "DI-330", nombre: "Juego dije y cadena", metal: "14k", peso: 3.3, forma: "dije" }
  ]
};

/* Dibujos de línea de cada tipo de pieza (sin fotos: es una demo). */
window.FORMAS = {
  arracada: '<circle cx="60" cy="62" r="30" fill="none" stroke-width="5"/><path d="M60 18v14" stroke-width="3"/>',
  broquel: '<circle cx="44" cy="60" r="11" stroke-width="4" fill="none"/><circle cx="78" cy="60" r="11" stroke-width="4" fill="none"/><circle cx="44" cy="60" r="3"/><circle cx="78" cy="60" r="3"/>',
  cadena: '<path d="M14 30c10 40 82 40 92 0" fill="none" stroke-width="3" stroke-dasharray="7 4"/><ellipse cx="60" cy="74" rx="6" ry="9" fill="none" stroke-width="3"/>',
  esclava: '<ellipse cx="60" cy="60" rx="40" ry="26" fill="none" stroke-width="7"/><ellipse cx="60" cy="60" rx="40" ry="26" fill="none" stroke-width="1.5" stroke-dasharray="3 5"/>',
  anillo: '<ellipse cx="60" cy="70" rx="28" ry="22" fill="none" stroke-width="6"/><path d="M48 46l12-14 12 14z" stroke-width="3" fill="none"/>',
  dije: '<path d="M60 16v16" stroke-width="3"/><circle cx="60" cy="62" r="24" fill="none" stroke-width="4"/><circle cx="60" cy="62" r="15" fill="none" stroke-width="1.5"/><circle cx="60" cy="34" r="4" fill="none" stroke-width="3"/>'
};
