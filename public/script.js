//Datos de Prueba
const grid = document.querySelector('#grid-videojuegos');
const ESTADO_CARGA = document.querySelector('#estado-carga');
const ESTADO_ERROR = document.querySelector('#estado-error');       
const inputBusqueda = document.querySelector(
    `input[placeholder="Buscar videojuegos..."]`
);

//Local data de videojuegos si la API falla
const videojuegosLocales = [
    {
       title: "Elden Ring",
       thumbnail: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png",
       normalPrice: "_",
       salePrice: "_",
       savings: null,
    },
    {
        title: "God of War",
        thumbnail: "https://gmedia.playstation.com/is/image/SIEPDC/god-of-war-listing-thumb-01-ps4-us-12jun17?$facebook$",
        normalPrice: "_",
        salePrice: "_",
        savings: null,
    },
    
];


//Funcion para pintar las cards
function renderizarVideojuegos(lista) {
    grid.innerHTML = ''; // Limpiar el grid antes de renderizar

    lista.forEach((juego) => {
        //Extraemos los datos necesarios con fallbacks
        const titulo = juego.title || juego.external || "Juego";
        const thumb = juego.thumb || juego.thumbnail || "";
        //Precios y ahorro con fallbacks
        //Usamos ?? para valores nulos o indefinidos
        const normal = juego.normalPrice ?? "_";
        const oferta = juego.salePrice ?? juego.cheapest ?? "_";
        //Ahorro redondeado si existe o null si no existe
        const ahorro = juego.savings ? Math.round(juego.savings) : null;


        //Creamos el html de cada card
        const card = document.createElement('article');
        card.className = "bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 flex flex-col";
        //
        card.innerHTML = `
        <img
            src="${thumb}"
            alt="${titulo}"
            class="h-40 w-full object-cover"
            />
        <div class="p-4 flex flex-col gap-2 flex-1">
        <h3 class="text-lg font-semibold text-slate-900">${titulo}</h3>

        <p class="text-xs text-slate-500">
        Precio: ${
            normal && normal !== "_" ? `<s>$${normal}</s>` : "_"
        }
        ${
            oferta && oferta !== "_" 
            ? `<span class="font-semibold text-slate-900">$${oferta}</span>`
            : ""
        }
        ${ahorro ? ` Ahorro ${ahorro}%` : ""}
       </p>

        <button class="mt-2 w-full bg-slate-900 text-white py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors"> 
        Ver detalle
        </button>
        </div>
        `;

        //Agregamos la card al grid
        grid.appendChild(card);
    });
}

//Cargar y renderizar videojuegos al inicio
async function cargarVideojuegosInicial() {
ESTADO_CARGA.classList.remove('hidden');
ESTADO_ERROR.classList.add('hidden');

    try{
        const url = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=20';
        const resp = await fetch (url); //Esperamos la respuesta de la API
        if (!resp.ok) {
            throw new Error('Error al obtener los datos de la API');
        }
        const data = await resp.json(); //Espera la conversacion a JSON

        //Esto los guarda en el cache
        window._juegosCache = data;
        renderizarVideojuegos(data);
    }catch (e) {
        console.error("Error al cargar CheapShark", e)
        ESTADO_ERROR.classList.remove('hidden');
        renderizarVideojuegos(videojuegosLocales);
    }finally {
        ESTADO_CARGA.classList.add('hidden');
    }
}
cargarVideojuegosInicial();