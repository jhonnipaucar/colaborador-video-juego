//  Seleccion del Dom
const grid = document.querySelector("#grid-videojuegos");
const spinner = document.querySelector("#spinner");
const estadoError = document.querySelector("#estado-error");
const inputBusqueda = document.querySelector("#input-busqueda");
const btnBuscar = document.querySelector("#btn-buscar");
const selectTienda = document.querySelector("#select-tienda");
const selectOrden = document.querySelector("#select-orden");
const btnVerMas = document.querySelector("#btn-ver-mas");

// Modal
const modal = document.querySelector("#modal");
const modalImg = document.querySelector("#modal-img");
const modalTitulo = document.querySelector("#modal-titulo");
const modalPrecioNormal = document.querySelector("#modal-precio-normal");
const modalPrecioOferta = document.querySelector("#modal-precio-oferta");
const modalLink = document.querySelector("#modal-link");
const modalCerrar = document.querySelector("#modal-cerrar");


let pagina = 0; // es para el boton ver mas
let juegosActuales = []; // Para ordenar y filtrar

// Render de tarjetas
function renderVideojuegos(lista) {
  grid.innerHTML = "";

  lista.forEach(juego => {
    const titulo = juego.title || juego.external || "Juego";
    const thumb = juego.thumb || juego.thumbnail || "";
    const normal = juego.normalPrice ?? "_";
    const oferta = juego.salePrice ?? juego.cheapest ?? "_";
    const ahorro = juego.savings ? Math.round(juego.savings) : null;

    const card = document.createElement('article');
    card.className =
            "bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 flex flex-col";

    card.innerHTML = `
    <img src="${thumb}" class="h-40 w-full object-cover" />
    <div class="p-4 flex flex-col gap-2 flex-1">
    <h3 class="text-md font-semibold text-slate-900">${titulo}</h3>

            <p class="text-sm text-slate-500">
                ${
                    normal !== "_" ? `<s>$${normal}</s>` : "-"
                }
                ${
                    oferta !== "_" 
                        ? ` <strong class="font-semibold text-slate-900">$${oferta}</strong>`
                        : ""
                }
                ${ahorro ? ` Ahorro ${ahorro}%` : ""}
            </p>

            <button class="btn-detalle mt-2 w-full bg-slate-900 text-white py-2 rounded-lg text-sm hover:bg-slate-700 transition">
                Ver detalle
            </button>
        </div>
        `;

        // Abrir modal
        card.querySelector('.btn-detalle').addEventListener('click', () => {
            abrirModal(juego);
        });

        grid.appendChild(card);
    });
}

  // Modal

function abrirModal(juego) {
    modalImg.src = juego.thumb || juego.thumbnail || "";
    modalTitulo.textContent = juego.title || juego.external || "Juego";

    modalPrecioNormal.textContent = `Precio normal: $${juego.normalPrice ?? "-"}`;
    modalPrecioOferta.textContent = `Oferta: $${juego.salePrice ?? juego.cheapest ?? "-"}`;

    modalLink.href = juego.dealID
        ? `https://www.cheapshark.com/redirect?dealID=${juego.dealID}`
        : "#";

    modal.classList.remove('hidden');
}

modalCerrar.addEventListener('click', () => {
    modal.classList.add('hidden');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});

// Carga inicial
async function cargarVideojuegosInicial() {
  spinner.classList.remove("hidden");
  estadoError.classList.add("hidden");

  try {
    const url =
            `https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=12&pageNumber=${pagina}`;

        const resp = await fetch(url);
         if (!resp.ok) throw new Error("Error en API");

    const data = await resp.json();
    juegosActuales = [...juegosActuales, ...data];

    renderVideojuegos(juegosActuales);

    btnVerMas.classList.remove("hidden");

  } catch (e){
    console.error(e);
    estadoError.classList.remove("hidden");
  } finally {
    spinner.classList.add("hidden");
  }
}

cargarVideojuegosInicial();

//  VER MÁS 

btnVerMas.addEventListener('click', () => {
    pagina++;
    cargarVideojuegosInicial();
});

// Busqueda

async function buscarVideojuegos() {
    const texto = inputBusqueda.value.trim();
    if (texto === "") return;

    spinner.classList.remove('hidden');
    estadoError.classList.add('hidden');

    try {
        const url = `https://www.cheapshark.com/api/1.0/games?title=${texto}&limit=20`;

        const resp = await fetch(url);
        if (!resp.ok) throw new Error("Error en API");

        const data = await resp.json();

        renderVideojuegos(data);
        btnVerMas.classList.add('hidden');
    } 
    catch (e) {
        estadoError.classList.remove('hidden');
    } 
    finally {
        spinner.classList.add('hidden');
    }
}

btnBuscar.addEventListener('click', buscarVideojuegos);


// Filtrado por tienda

selectTienda.addEventListener('change', () => {
    const tienda = selectTienda.value;

    if (tienda === "") {
        renderVideojuegos(juegosActuales);
        return;
    }

    const filtrados = juegosActuales.filter(j => j.storeID == tienda);
    renderVideojuegos(filtrados);
});


// Ordenamiento

selectOrden.addEventListener('change', () => {
    let lista = [...juegosActuales];

    if (selectOrden.value === "precio-asc") {
        lista.sort((a, b) => a.salePrice - b.salePrice);
    }

    if (selectOrden.value === "precio-desc") {
        lista.sort((a, b) => b.salePrice - a.salePrice);
    }

    renderVideojuegos(lista);
});

