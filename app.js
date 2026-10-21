(function () {
  const D = window.DEMO;
  const $ = (s) => document.querySelector(s);
  const mxn = (n) => n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
  const fechaHoy = () => new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long" });

  // ---- estado: precios del día (se recuerdan en este navegador, solo para la demo) ----
  let estado = { precios: { ...D.precios }, minimo: D.minimo, publicado: null };
  try {
    const g = JSON.parse(localStorage.getItem("vonoa-joyeria-demo") || "null");
    if (g && g.precios) estado = g;
  } catch (e) { /* sin almacenamiento: se usan los valores de ejemplo */ }
  const guardar = () => { try { localStorage.setItem("vonoa-joyeria-demo", JSON.stringify(estado)); } catch (e) {} };

  const pedido = {}; // id -> cantidad
  let filtro = "todos";
  const precioPieza = (p) => Math.round(p.peso * estado.precios[p.metal]);

  // ---- cotización visible para el cliente ----
  function pintarCotiz() {
    const hora = estado.publicado ? "Publicado " + estado.publicado : "Precios de ejemplo";
    $("#cotiz").innerHTML = ["10k", "14k", "925"].map((m) =>
      `<li><span class="spec">${D.metales[m].nombre}</span><span class="v">${mxn(estado.precios[m])}</span><span class="f">por gramo</span></li>`
    ).join("");
    $("#cotiz").setAttribute("title", hora);
  }

  // ---- catálogo ----
  function pintarGrid() {
    const lista = D.piezas.filter((p) => filtro === "todos" || p.metal === filtro);
    $("#grid").innerHTML = lista.map((p) => {
      const c = pedido[p.id] || 0;
      return `<li class="pieza${c ? " en-pedido" : ""}" data-id="${p.id}">
        <div class="foto"><img src="fotos/${p.id}.jpg" alt="${p.nombre}, ${D.metales[p.metal].nombre} (foto de ejemplo)" width="400" height="400" loading="lazy" decoding="async"></div>
        <div class="info">
          <h3>${p.nombre}</h3>
          <div class="meta">${D.metales[p.metal].nombre} · ${p.peso.toFixed(1)} g · ${p.id}</div>
          <div class="precio">${mxn(precioPieza(p))} <small>c/u</small></div>
          <div class="fila">
            <div class="cant" role="group" aria-label="Cantidad de ${p.nombre}">
              <button data-a="menos" aria-label="Quitar una">−</button>
              <output>${c}</output>
              <button data-a="mas" aria-label="Agregar una">+</button>
            </div>
            <button class="link-cert" data-a="cert">Certificado</button>
          </div>
        </div></li>`;
    }).join("");
  }

  function pintarBarra() {
    let piezas = 0, gramos = 0, total = 0;
    for (const p of D.piezas) {
      const c = pedido[p.id] || 0;
      piezas += c; gramos += c * p.peso; total += c * precioPieza(p);
    }
    $("#total").textContent = mxn(total);
    $("#detalle").textContent = `${piezas} pieza${piezas === 1 ? "" : "s"} · ${gramos.toFixed(1)} g`;
    const falta = estado.minimo - total;
    const el = $("#falta");
    if (piezas === 0) { el.textContent = `Mínimo de mayoreo: ${mxn(estado.minimo)}`; el.className = "falta"; }
    else if (falta > 0) { el.textContent = `Faltan ${mxn(falta)} para el mínimo`; el.className = "falta"; }
    else { el.textContent = "Ya cumple el mínimo de mayoreo"; el.className = "falta listo"; }
    $("#enviar").disabled = piezas === 0 || falta > 0;
  }

  function textoPedido() {
    const lineas = [`Pedido de mayoreo · ${D.negocio}`, `Precios del ${fechaHoy()}`, ""];
    let total = 0, gramos = 0, piezas = 0;
    for (const p of D.piezas) {
      const c = pedido[p.id] || 0;
      if (!c) continue;
      const sub = c * precioPieza(p);
      total += sub; gramos += c * p.peso; piezas += c;
      lineas.push(`• ${c} × ${p.nombre} (${D.metales[p.metal].nombre}, ${p.peso.toFixed(1)} g) = ${mxn(sub)}`);
    }
    lineas.push("", `Total: ${mxn(total)} · ${piezas} piezas · ${gramos.toFixed(1)} g`, "", "Nombre:", "Ciudad:");
    return lineas.join("\n");
  }

  // ---- certificado ----
  function abrirCert(p) {
    const m = D.metales[p.metal];
    $("#cert-titulo").textContent = p.nombre;
    $("#cert-foto").src = "fotos/" + p.id + ".jpg";
    $("#cert-foto").alt = p.nombre + " (foto de ejemplo)";
    $("#cert-datos").innerHTML = `
      <dt>Folio</dt><dd>VN-${p.id}</dd>
      <dt>Metal</dt><dd>${m.nombre}</dd>
      <dt>Ley</dt><dd>${m.ley}</dd>
      <dt>Peso</dt><dd>${p.peso.toFixed(2)} g</dd>
      <dt>Taller</dt><dd>${D.negocio}</dd>
      <dt>Registro</dt><dd>Aquí va su registro de contraste o Grupo de Calidad</dd>`;
    const url = new URL("c.html?p=" + encodeURIComponent(p.id), location.href).href;
    $("#cert-abrir").href = url;
    const q = $("#qr"); q.innerHTML = "";
    if (window.QRCode) new QRCode(q, { text: url, width: 224, height: 224, colorDark: "#1C1A17", colorLight: "#ffffff" });
    else q.textContent = "QR";
    $("#cert").showModal();
  }

  // ---- eventos del catálogo ----
  $("#grid").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    const li = b.closest(".pieza"); const p = D.piezas.find((x) => x.id === li.dataset.id);
    if (b.dataset.a === "mas") pedido[p.id] = (pedido[p.id] || 0) + 1;
    else if (b.dataset.a === "menos") pedido[p.id] = Math.max(0, (pedido[p.id] || 0) - 1);
    else if (b.dataset.a === "cert") return abrirCert(p);
    li.querySelector("output").textContent = pedido[p.id];
    li.classList.toggle("en-pedido", pedido[p.id] > 0);
    pintarBarra();
  });
  document.querySelectorAll(".chip").forEach((c) => c.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((x) => x.classList.toggle("on", x === c));
    filtro = c.dataset.f; pintarGrid();
  }));
  $("#enviar").addEventListener("click", () => {
    window.open("https://wa.me/?text=" + encodeURIComponent(textoPedido()), "_blank", "noopener");
  });

  // ---- pestañas ----
  function verTab(cual) {
    const cliente = cual === "cliente";
    $("#tab-cliente").setAttribute("aria-selected", cliente);
    $("#tab-panel").setAttribute("aria-selected", !cliente);
    $("#vista-cliente").hidden = !cliente;
    $("#vista-panel").hidden = cliente;
    $("#barra").style.display = cliente ? "" : "none";
    window.scrollTo({ top: 0 });
  }
  $("#tab-cliente").addEventListener("click", () => verTab("cliente"));
  $("#tab-panel").addEventListener("click", () => verTab("panel"));

  // ---- panel del joyero ----
  const form = $("#form-precios");
  // "925" no sirve con form.elements[...]: lo toma como índice numérico.
  const campo = (n) => form.querySelector(`[name="${n}"]`);
  const ejemplo = D.piezas[2]; // cadena cartier 10k
  function pintarEjemplo(nuevo) {
    const antes = Math.round(ejemplo.peso * estado.precios[ejemplo.metal]);
    const ahora = Math.round(ejemplo.peso * (nuevo ?? estado.precios[ejemplo.metal]));
    $("#ej-pieza").textContent = `${ejemplo.nombre}, ${ejemplo.peso} g de ${D.metales[ejemplo.metal].nombre}: ` +
      (antes === ahora ? mxn(ahora) : `${mxn(antes)} → ${mxn(ahora)}`);
  }
  function llenarForm() {
    for (const m of ["10k", "14k", "925"]) campo(m).value = estado.precios[m];
    campo("minimo").value = estado.minimo;
    pintarEjemplo();
  }
  campo("10k").addEventListener("input", (e) => {
    const v = parseFloat(e.target.value); if (v > 0) pintarEjemplo(v);
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const n = {};
    for (const m of ["10k", "14k", "925"]) {
      const v = parseFloat(campo(m).value);
      if (!(v > 0)) { $("#ok").textContent = "Revise el precio de " + D.metales[m].nombre; return; }
      n[m] = v;
    }
    const min = parseFloat(campo("minimo").value);
    estado.precios = n;
    estado.minimo = min >= 0 ? min : estado.minimo;
    estado.publicado = new Date().toLocaleString("es-MX", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
    guardar();
    pintarCotiz(); pintarGrid(); pintarBarra(); pintarEjemplo();
    $("#ok").textContent = `Listo: ${D.piezas.length} piezas recalculadas. Véalo en "Lo que ve su cliente".`;
  });

  pintarCotiz(); pintarGrid(); pintarBarra(); llenarForm();
})();
