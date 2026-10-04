/* ============================================================
   ASTROX — app.js
   Toda la lógica del frontend: no requiere servidor ni backend.
   Persistencia con localStorage (usuarios, sesión, carrito, favoritos)
   ============================================================ */

const WHATSAPP_NUMERO = "573136244502";

/* ---------------------------------------------------------
   ICONOS SVG (sin dependencias externas)
--------------------------------------------------------- */
const ICONOS = {
  camiseta:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3 3 7l3 3 2-1.3V21h8V8.7L18 10l3-3-5-4-2 2h-4L8 3Z" stroke-linejoin="round"/></svg>',
  sudadera:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 3 3 6l2.5 3L7 8v13h10V8l1.5 1L21 6l-4-3-2.5 2h-5L7 3Z" stroke-linejoin="round"/><path d="M9.5 8h5" stroke-linecap="round"/></svg>',
  short:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16l1 8h-6l-1 8h-3l-.6-8H10l-.6 8H6l-1-8H4l1-8Z" stroke-linejoin="round"/></svg>',
  medias:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2h8v10l4 6a2 2 0 0 1-2 3h-2a2 2 0 0 1-2-1.6L13 15H8V2Z" stroke-linejoin="round"/></svg>',
  conjunto:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 2 3 5l2.5 2.5L7 6.5v4.5h4l.5 3h1L13 11h4V6.5l1.5 1L21 5l-4-3-2 1.7H9L7 2Z" stroke-linejoin="round"/><path d="M9 14l-1.5 8h9L15 14" stroke-linejoin="round"/></svg>',
  top:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 4 4 6l2 3 2-1v9h8V8l2 1 2-3-3-2-2 1.5h-6L7 4Z" stroke-linejoin="round"/></svg>',
  leggins:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2h8l.5 9-1 11h-2l-1-9h-1l-1 9H8l-1-11L8 2Z" stroke-linejoin="round"/></svg>',
  buscar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>',
  corazon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-10-9.3C.6 8.1 2.4 4.5 6 4c2-.3 3.7.7 6 3 2.3-2.3 4-3.3 6-3 3.6.5 5.4 4.1 4 7.7C19.5 16.4 12 21 12 21Z" stroke-linejoin="round"/></svg>',
  carrito:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.6 12.4A2 2 0 0 0 9.5 17h8a2 2 0 0 0 1.9-1.4L21 8H6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  usuario:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4.5 5-6.5 8-6.5s6.5 2 8 6.5" stroke-linecap="round"/></svg>',
  cerrar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 5l14 14M19 5 5 19" stroke-linecap="round"/></svg>',
  whatsapp:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5C9.4 9 8.9 7.8 8.7 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3C6.6 7.5 6 8.1 6 9.4c0 1.3.9 2.6 1.1 2.8.1.2 1.9 3 4.7 4.1 2.7 1.1 2.7.7 3.2.7.5 0 1.7-.7 1.9-1.3.2-.7.2-1.2.1-1.3Z"/><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z"/></svg>',
  arriba:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
  facebook:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h2.7l.4-3.2H13V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2C16 4.1 14.9 4 13.7 4c-2.6 0-4.4 1.6-4.4 4.5v2.3H6.6V13H9.3v9H13Z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  escudo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" stroke-linejoin="round"/></svg>',
  audifono:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 13v-1a8 8 0 0 1 16 0v1" stroke-linecap="round"/><rect x="2" y="13" width="5" height="7" rx="2"/><rect x="17" y="13" width="5" height="7" rx="2"/></svg>',
  candado:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  camion:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 7h11v9H2z"/><path d="M13 10h4l4 3v3h-8v-6Z"/><circle cx="6.5" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>',
  usuarios:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 21c.7-3.5 3-5.5 6-5.5s5.3 2 6 5.5M15 15.5c2.4.2 4 1.9 4.6 5.5" stroke-linecap="round"/></svg>',
  carrito2:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.6 12.4A2 2 0 0 0 9.5 17h8a2 2 0 0 0 1.9-1.4L21 8H6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

/* ---------------------------------------------------------
   ESTADO (localStorage)
--------------------------------------------------------- */
const Estado = {
  cargar(clave, porDefecto){
    try{ const v = localStorage.getItem(clave); return v ? JSON.parse(v) : porDefecto; }
    catch(e){ return porDefecto; }
  },
  guardar(clave, valor){ localStorage.setItem(clave, JSON.stringify(valor)); }
};

let usuarios   = Estado.cargar("astrox_usuarios", []);
let sesion     = Estado.cargar("astrox_sesion", null);
let carrito    = Estado.cargar("astrox_carrito", []);
let favoritos  = Estado.cargar("astrox_favoritos", []);

let filtroCategoria = "Todos";
let filtroTexto = "";
let filtrosTipo = new Set();
let filtrosPrecio = new Set();
let filtroColor = null;

let productoActivo = null; // producto abierto en el modal
let colorSeleccionado = null;
let tallaSeleccionada = null;

/* ---------------------------------------------------------
   UTILIDADES
--------------------------------------------------------- */
function formatoCOP(valor){
  return "$" + valor.toLocaleString("es-CO");
}
function mostrarToast(mensaje){
  const cont = document.getElementById("toast-cont");
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = ICONOS.check + `<span>${mensaje}</span>`;
  cont.appendChild(t);
  setTimeout(()=>{ t.style.opacity="0"; t.style.transition="opacity .3s"; setTimeout(()=>t.remove(),300); }, 2600);
}
function abrirOverlay(id){ document.getElementById(id).classList.remove("oculto"); document.body.style.overflow="hidden"; }
function cerrarOverlay(id){ document.getElementById(id).classList.add("oculto"); document.body.style.overflow=""; }

/* ---------------------------------------------------------
   NAVEGACIÓN ENTRE SECCIONES (SPA con una sola página)
--------------------------------------------------------- */
function irASeccion(nombre){
  document.querySelectorAll(".seccion-app").forEach(s=>s.classList.add("oculto"));
  const destino = document.getElementById("seccion-"+nombre);
  if(destino) destino.classList.remove("oculto");
  document.querySelectorAll(".nav-links a").forEach(a=>{
    a.classList.toggle("activo", a.dataset.seccion === nombre);
  });
  document.getElementById("nav-links").classList.remove("abierto");
  window.scrollTo({top:0, behavior:"smooth"});
}

/* ---------------------------------------------------------
   RENDER: TARJETA DE PRODUCTO
--------------------------------------------------------- */
function badgeTexto(b){
  if(b==="NUEVO") return '<span class="tp-etiqueta nuevo">Nuevo</span>';
  if(b==="OFERTA") return '<span class="tp-etiqueta oferta">Oferta</span>';
  if(b==="AGOTADO") return '<span class="tp-etiqueta agotado">Agotado</span>';
  return "";
}
function imagenProductoURL(p, color){
  if(!p) return null;
  if(color && p.imagenes && p.imagenes[color]) return p.imagenes[color];
  if(p.imagen) return p.imagen;
  if(p.imagenes){
    const primera = Object.values(p.imagenes)[0];
    return primera || null;
  }
  return null;
}
function productoImagenHTML(p, color){
  const url = imagenProductoURL(p, color);
  if(url){
    return `<img class="tp-img" src="${url}" alt="${p.nombre}">`;
  }
  return ICONOS[p.icono] || "";
}
function tarjetaProductoHTML(p){
  const esFav = favoritos.includes(p.id);
  const agotado = p.badge === "AGOTADO";
  return `
  <article class="tarjeta-producto" data-id="${p.id}">
    <div class="tp-media">
      ${badgeTexto(p.badge)}
      <button class="tp-fav ${esFav?"activo":""}" data-fav="${p.id}" aria-label="Favorito">${ICONOS.corazon}</button>
      ${productoImagenHTML(p, p.colores[0])}
    </div>
    <div class="tp-cuerpo">
      <span class="tp-cat">${p.categoria} · ${p.tipo}</span>
      <h3 class="tp-nombre">${p.nombre}</h3>
      <div class="tp-colores">${p.colores.map(c=>`<span class="swatch" style="background:${c}"></span>`).join("")}</div>
      <div class="tp-precio-row">
        <span class="tp-precio">${agotado ? "—" : formatoCOP(p.precio)}</span>
        <button class="btn btn-primario btn-peq" data-abrir="${p.id}" ${agotado?"disabled":""}>${agotado?"Agotado":"Ver"}</button>
      </div>
    </div>
  </article>`;
}

/* ---------------------------------------------------------
   DESTACADOS (Inicio)
--------------------------------------------------------- */
function renderDestacados(){
  const cont = document.getElementById("grilla-destacados");
  const destacados = PRODUCTOS.filter(p=>p.destacado).slice(0,4);
  cont.innerHTML = destacados.map(tarjetaProductoHTML).join("");
}

/* ---------------------------------------------------------
   CATÁLOGO: FILTROS + RENDER
--------------------------------------------------------- */
function productosFiltrados(){
  return PRODUCTOS.filter(p=>{
    if(filtroCategoria !== "Todos" && p.categoria !== filtroCategoria) return false;
    if(filtrosTipo.size && !filtrosTipo.has(p.tipo)) return false;
    if(filtroColor && !p.colores.includes(filtroColor)) return false;
    if(filtroTexto && !p.nombre.toLowerCase().includes(filtroTexto.toLowerCase())) return false;
    if(filtrosPrecio.size){
      const enRango = [...filtrosPrecio].some(rango=>{
        if(rango==="bajo") return p.precio>0 && p.precio<=50000;
        if(rango==="medio") return p.precio>50000 && p.precio<=80000;
        if(rango==="alto") return p.precio>80000;
        return false;
      });
      if(!enRango) return false;
    }
    return true;
  });
}

function renderCatalogo(conSkeleton){
  const cont = document.getElementById("grilla-catalogo");
  const conteo = document.getElementById("resultado-conteo");

  if(conSkeleton){
    cont.innerHTML = Array(6).fill('<div class="skeleton"></div>').join("");
    setTimeout(()=>renderCatalogo(false), 420);
    return;
  }

  const lista = productosFiltrados();
  conteo.textContent = `${lista.length} producto${lista.length===1?"":"s"} encontrado${lista.length===1?"":"s"}`;
  cont.innerHTML = lista.length
    ? lista.map(tarjetaProductoHTML).join("")
    : `<div class="sin-resultados">No encontramos productos con esos filtros.<br>Intenta limpiar la búsqueda.</div>`;
}

function construirFiltrosTipo(){
  const tipos = [...new Set(PRODUCTOS.map(p=>p.tipo))];
  document.getElementById("filtro-tipos").innerHTML = tipos.map(t=>`
    <label class="filtro-opcion">
      <input type="checkbox" value="${t}" class="chk-tipo"> ${t}
    </label>`).join("");
}

function limpiarFiltros(){
  filtrosTipo.clear(); filtrosPrecio.clear(); filtroColor=null; filtroTexto="";
  document.querySelectorAll(".chk-tipo, .chk-precio").forEach(c=>c.checked=false);
  document.getElementById("input-buscar").value="";
  document.querySelectorAll(".filtro-color button").forEach(b=>b.classList.remove("activo"));
  renderCatalogo(false);
}

/* ---------------------------------------------------------
   FAVORITOS
--------------------------------------------------------- */
function alternarFavorito(id){
  id = Number(id);
  if(favoritos.includes(id)) favoritos = favoritos.filter(f=>f!==id);
  else favoritos.push(id);
  Estado.guardar("astrox_favoritos", favoritos);
  document.querySelectorAll(`[data-fav="${id}"]`).forEach(b=>b.classList.toggle("activo"));
}

/* ---------------------------------------------------------
   MODAL DE PRODUCTO
--------------------------------------------------------- */
function actualizarImagenModal(){
  if(!productoActivo) return;
  document.getElementById("mp-icono").innerHTML = productoImagenHTML(productoActivo, colorSeleccionado);
}
function abrirProducto(id){
  const p = PRODUCTOS.find(x=>x.id===Number(id));
  if(!p) return;
  productoActivo = p;
  colorSeleccionado = p.colores[0] || null;
  tallaSeleccionada = null;

  actualizarImagenModal();
  document.getElementById("mp-cat").textContent = `${p.categoria} · ${p.tipo}`;
  document.getElementById("mp-nombre").textContent = p.nombre;
  document.getElementById("mp-precio").textContent = p.badge==="AGOTADO" ? "No disponible" : formatoCOP(p.precio);
  document.getElementById("mp-desc").textContent = p.descripcion;

  document.getElementById("mp-colores").innerHTML = p.colores.map((c,i)=>
    `<button data-color="${c}" class="${i===0?"activo":""}" style="background:${c}" aria-label="Color"></button>`).join("");

  document.getElementById("mp-tallas").innerHTML = p.tallas.length
    ? p.tallas.map(t=>`<button data-talla="${t}">${t}</button>`).join("")
    : `<span style="color:var(--gray);font-size:13px">Sin tallas disponibles</span>`;

  const btnAgregar = document.getElementById("mp-agregar");
  btnAgregar.disabled = p.badge==="AGOTADO";
  btnAgregar.textContent = p.badge==="AGOTADO" ? "Agotado" : "Agregar al carrito";

  abrirOverlay("overlay-producto");
}

document.addEventListener("click", (e)=>{
  const colorBtn = e.target.closest("#mp-colores button");
  if(colorBtn){
    colorSeleccionado = colorBtn.dataset.color;
    document.querySelectorAll("#mp-colores button").forEach(b=>b.classList.remove("activo"));
    colorBtn.classList.add("activo");
    actualizarImagenModal();
  }
  const tallaBtn = e.target.closest("#mp-tallas button");
  if(tallaBtn){
    tallaSeleccionada = tallaBtn.dataset.talla;
    document.querySelectorAll("#mp-tallas button").forEach(b=>b.classList.remove("activo"));
    tallaBtn.classList.add("activo");
  }
});

document.getElementById("mp-agregar").addEventListener("click", ()=>{
  if(!productoActivo) return;
  if(productoActivo.tallas.length && !tallaSeleccionada){
    mostrarToast("Selecciona una talla");
    return;
  }
  agregarAlCarrito(productoActivo, colorSeleccionado, tallaSeleccionada || "Única");
  cerrarOverlay("overlay-producto");
  mostrarToast("Producto agregado al carrito");
});

/* ---------------------------------------------------------
   CARRITO
--------------------------------------------------------- */
function agregarAlCarrito(p, color, talla){
  const existente = carrito.find(i=>i.id===p.id && i.color===color && i.talla===talla);
  if(existente){ existente.cantidad++; }
  else {
    carrito.push({ id:p.id, nombre:p.nombre, precio:p.precio, icono:p.icono, color, talla, cantidad:1 });
  }
  Estado.guardar("astrox_carrito", carrito);
  actualizarContadores();
}

function cambiarCantidad(index, delta){
  carrito[index].cantidad += delta;
  if(carrito[index].cantidad <= 0) carrito.splice(index,1);
  Estado.guardar("astrox_carrito", carrito);
  renderCarrito();
  actualizarContadores();
}
function eliminarDelCarrito(index){
  carrito.splice(index,1);
  Estado.guardar("astrox_carrito", carrito);
  renderCarrito();
  actualizarContadores();
}
function totalCarrito(){
  return carrito.reduce((s,i)=>s+i.precio*i.cantidad,0);
}
function renderCarrito(){
  const cont = document.getElementById("carrito-items");
  const aviso = document.getElementById("aviso-login-carrito");
  aviso.classList.toggle("visible", !sesion);

  if(!carrito.length){
    cont.innerHTML = `<div class="carrito-vacio">${ICONOS.carrito2}<p>Tu carrito está vacío.</p></div>`;
  } else {
    cont.innerHTML = carrito.map((item,i)=>`
      <div class="carrito-item">
        <div class="ci-icono">${ICONOS[item.icono]}</div>
        <div class="ci-info">
          <div class="nombre">${item.nombre}</div>
          <div class="meta">
            <span class="swatch" style="background:${item.color};display:inline-block;vertical-align:-2px;width:10px;height:10px;"></span>
            Talla ${item.talla}
          </div>
          <div class="ci-cantidad">
            <button data-menos="${i}">−</button>
            <span>${item.cantidad}</span>
            <button data-mas="${i}">+</button>
          </div>
        </div>
        <div style="text-align:right">
          <div class="ci-precio">${formatoCOP(item.precio*item.cantidad)}</div>
          <button class="ci-borrar" data-borrar="${i}">${ICONOS.cerrar}</button>
        </div>
      </div>`).join("");
  }
  document.getElementById("carrito-total").textContent = formatoCOP(totalCarrito());
  document.getElementById("btn-finalizar-compra").disabled = carrito.length===0;
}

document.getElementById("carrito-items").addEventListener("click",(e)=>{
  const menos = e.target.closest("[data-menos]");
  const mas = e.target.closest("[data-mas]");
  const borrar = e.target.closest("[data-borrar]");
  if(menos) cambiarCantidad(Number(menos.dataset.menos), -1);
  if(mas) cambiarCantidad(Number(mas.dataset.mas), 1);
  if(borrar) eliminarDelCarrito(Number(borrar.dataset.borrar));
});

function actualizarContadores(){
  document.getElementById("contador-carrito").textContent = carrito.reduce((s,i)=>s+i.cantidad,0);
  document.getElementById("contador-fav").textContent = favoritos.length;
}

/* ---------------------------------------------------------
   FINALIZAR COMPRA -> WHATSAPP
--------------------------------------------------------- */
function finalizarCompra(){
  if(!sesion){
    mostrarToast("Debes iniciar sesión para realizar la compra.");
    cerrarOverlay("overlay-carrito");
    abrirOverlay("overlay-login");
    return;
  }
  if(!carrito.length) return;

  let msg = `Hola AstroX. Quiero realizar el siguiente pedido:\n\n`;
  carrito.forEach(item=>{
    msg += `• ${item.nombre}\n   Talla: ${item.talla} | Cantidad: ${item.cantidad}\n   Subtotal: ${formatoCOP(item.precio*item.cantidad)}\n\n`;
  });
  msg += `Total: ${formatoCOP(totalCarrito())}\n\n`;
  msg += `Mi nombre es: ${sesion.nombre}\nCorreo: ${sesion.correo}\nDirección:\nCiudad:\n\nGracias.`;

  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

/* ---------------------------------------------------------
   LOGIN / REGISTRO (localStorage, solo educativo)
--------------------------------------------------------- */
function actualizarUIUsuario(){
  const btn = document.getElementById("btn-usuario");
  btn.title = sesion ? `Hola, ${sesion.nombre}` : "Iniciar sesión";
}

function iniciarSesion(correo, clave){
  const u = usuarios.find(u=>u.correo===correo && u.clave===clave);
  if(!u) return false;
  sesion = { nombre:u.nombre, correo:u.correo };
  Estado.guardar("astrox_sesion", sesion);
  actualizarUIUsuario();
  return true;
}
function registrarUsuario(nombre, correo, clave){
  if(usuarios.some(u=>u.correo===correo)) return "correo-existente";
  usuarios.push({ nombre, correo, clave });
  Estado.guardar("astrox_usuarios", usuarios);
  sesion = { nombre, correo };
  Estado.guardar("astrox_sesion", sesion);
  actualizarUIUsuario();
  return "ok";
}
function cerrarSesion(){
  sesion = null;
  localStorage.removeItem("astrox_sesion");
  actualizarUIUsuario();
  mostrarToast("Sesión cerrada");
}

/* ---------------------------------------------------------
   INICIALIZACIÓN
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", ()=>{

  construirFiltrosTipo();
  renderDestacados();
  renderCatalogo(true);
  renderCarrito();
  actualizarContadores();
  actualizarUIUsuario();

  // Navegación
  document.querySelectorAll("[data-seccion]").forEach(a=>{
    a.addEventListener("click",(e)=>{ e.preventDefault(); irASeccion(a.dataset.seccion); });
  });
  document.getElementById("nav-burger").addEventListener("click",()=>{
    document.getElementById("nav-links").classList.toggle("abierto");
  });

  // Delegación de clicks en tarjetas de producto (favorito / abrir)
  document.addEventListener("click",(e)=>{
    const fav = e.target.closest("[data-fav]");
    if(fav){ alternarFavorito(fav.dataset.fav); }
    const abrir = e.target.closest("[data-abrir]");
    if(abrir && !abrir.disabled){ abrirProducto(abrir.dataset.abrir); }
  });

  // Tabs de categoría en catálogo
  document.querySelectorAll(".tab-cat").forEach(tab=>{
    tab.addEventListener("click",()=>{
      document.querySelectorAll(".tab-cat").forEach(t=>t.classList.remove("activo"));
      tab.classList.add("activo");
      filtroCategoria = tab.dataset.cat;
      renderCatalogo(false);
    });
  });

  // Filtros: tipo
  document.getElementById("filtro-tipos").addEventListener("change",(e)=>{
    if(e.target.classList.contains("chk-tipo")){
      e.target.checked ? filtrosTipo.add(e.target.value) : filtrosTipo.delete(e.target.value);
      renderCatalogo(false);
    }
  });
  // Filtros: precio
  document.querySelectorAll(".chk-precio").forEach(chk=>{
    chk.addEventListener("change",()=>{
      chk.checked ? filtrosPrecio.add(chk.value) : filtrosPrecio.delete(chk.value);
      renderCatalogo(false);
    });
  });
  // Filtros: color
  document.querySelectorAll(".filtro-color button").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const yaActivo = btn.classList.contains("activo");
      document.querySelectorAll(".filtro-color button").forEach(b=>b.classList.remove("activo"));
      if(yaActivo){ filtroColor=null; }
      else { btn.classList.add("activo"); filtroColor = btn.dataset.color; }
      renderCatalogo(false);
    });
  });
  document.getElementById("limpiar-filtros").addEventListener("click", limpiarFiltros);

  // Buscador
  document.getElementById("input-buscar").addEventListener("input",(e)=>{
    filtroTexto = e.target.value;
    renderCatalogo(false);
  });

  // Modales: cerrar
  document.querySelectorAll("[data-cerrar-modal]").forEach(b=>{
    b.addEventListener("click",()=>cerrarOverlay(b.dataset.cerrarModal));
  });
  document.querySelectorAll(".overlay").forEach(ov=>{
    ov.addEventListener("click",(e)=>{ if(e.target===ov) ov.classList.add("oculto"), (document.body.style.overflow=""); });
  });
  document.addEventListener("keydown",(e)=>{
    if(e.key==="Escape") document.querySelectorAll(".overlay").forEach(o=>o.classList.add("oculto"));
  });

  // Carrito abrir
  document.getElementById("btn-carrito").addEventListener("click",()=>{ renderCarrito(); abrirOverlay("overlay-carrito"); });
  document.getElementById("btn-finalizar-compra").addEventListener("click", finalizarCompra);

  // Usuario / login
  document.getElementById("btn-usuario").addEventListener("click",()=>{
    if(sesion){
      if(confirm(`Hola ${sesion.nombre}. ¿Deseas cerrar sesión?`)) cerrarSesion();
    } else {
      abrirOverlay("overlay-login");
    }
  });

  document.querySelectorAll(".tab-login").forEach(t=>{
    t.addEventListener("click",()=>{
      document.querySelectorAll(".tab-login").forEach(x=>x.classList.remove("activo"));
      t.classList.add("activo");
      document.getElementById("form-ingresar").classList.toggle("oculto", t.dataset.tab!=="ingresar");
      document.getElementById("form-registrar").classList.toggle("oculto", t.dataset.tab!=="registrar");
      document.getElementById("error-login").textContent = "";
    });
  });

  document.getElementById("form-ingresar").addEventListener("submit",(e)=>{
    e.preventDefault();
    const correo = document.getElementById("login-correo").value.trim();
    const clave = document.getElementById("login-clave").value;
    if(iniciarSesion(correo, clave)){
      cerrarOverlay("overlay-login");
      mostrarToast(`Bienvenido, ${sesion.nombre}`);
      e.target.reset();
    } else {
      document.getElementById("error-login").textContent = "Correo o contraseña incorrectos.";
    }
  });

  document.getElementById("form-registrar").addEventListener("submit",(e)=>{
    e.preventDefault();
    const nombre = document.getElementById("reg-nombre").value.trim();
    const correo = document.getElementById("reg-correo").value.trim();
    const clave = document.getElementById("reg-clave").value;
    const res = registrarUsuario(nombre, correo, clave);
    if(res==="ok"){
      cerrarOverlay("overlay-login");
      mostrarToast(`Cuenta creada. ¡Bienvenido, ${sesion.nombre}!`);
      e.target.reset();
    } else {
      document.getElementById("error-registro").textContent = "Ese correo ya está registrado.";
    }
  });

  // Formulario de contacto (simulado, sin backend)
  document.getElementById("form-contacto").addEventListener("submit",(e)=>{
    e.preventDefault();
    mostrarToast("Mensaje enviado. Te responderemos pronto.");
    e.target.reset();
  });

  // Botón flotante volver arriba
  window.addEventListener("scroll",()=>{
    document.getElementById("btn-arriba").classList.toggle("visible", window.scrollY>500);
  });
  document.getElementById("btn-arriba").addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

  irASeccion("inicio");
});
