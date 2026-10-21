/* Piezas y precios DE EJEMPLO para la demo. No son de ninguna joyería real.
   Las fotos son de uso libre (Pexels); los créditos están en CREDITOS.md.
   En la versión real, cada joyero carga su catálogo con sus fotos y captura su precio del gramo. */
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
    { id: "AR-018", nombre: "Arracada lisa 18 mm",        metal: "10k", peso: 1.8 },
    { id: "BR-004", nombre: "Broquel bolita 4 mm",        metal: "14k", peso: 0.6 },
    { id: "CA-050", nombre: "Cadena de eslabón 50 cm",    metal: "10k", peso: 4.2 },
    { id: "ES-210", nombre: "Brazalete abierto",          metal: "14k", peso: 6.5 },
    { id: "AN-031", nombre: "Argolla lisa",               metal: "14k", peso: 2.4 },
    { id: "DI-112", nombre: "Dije medalla con cadena",    metal: "10k", peso: 1.5 },
    { id: "CA-145", nombre: "Cadena barbada 45 cm",       metal: "925", peso: 6.0 },
    { id: "AR-207", nombre: "Arracada con dije de estrella", metal: "925", peso: 2.2 },
    { id: "AN-090", nombre: "Anillo sello",               metal: "10k", peso: 5.1 },
    { id: "BR-033", nombre: "Broquel corazón",            metal: "10k", peso: 0.9 },
    { id: "PU-084", nombre: "Cadena fina con broche",     metal: "925", peso: 8.4 },
    { id: "DI-330", nombre: "Medallón esmaltado",         metal: "14k", peso: 3.3 }
  ]
};
