//Datos de Prueba

const videojuegos = [
    {
        id: 1,
        nombre: "Elden Ring",   
        descripcion:  "Acción · RPG · PC / PS5 / Xbox",
        rating: 4.8,
        imagen: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png",
    },
    {
        id: 2,
        nombre: "God of War",   
        descripcion:  "Acción · Aventura · PS4 / PS5",
        rating: 4.9,
        imagen: "https://gmedia.playstation.com/is/image/SIEPDC/god-of-war-listing-thumb-01-ps4-us-12jun17?$facebook$",
    },
    {
        id: 3,
        nombre: "Zelda: TOTK",   
        descripcion:  "Aventura · Mundo abierto · Switch",
        rating: 4.7,
        imagen: "https://www.qualbert.com/wp-content/uploads/2023/06/Tears-of-the-Kingdom-wallpaper-1170x720.jpg",
    },
    {
        id: 4,
        nombre: "Fortnite",   
        descripcion:  "Battle Royale · Multiplataforma",
        rating: 4.3,
        imagen: "https://dropinblog.net/34253310/files/featured/imagem-2024-09-26-103919931.png",
    },
];

const grid = document.querySelector('#grid-videojuegos');

//Funcion para pintar las cards
function renderizarVideojuegos(lista) {
    grid.innerHTML = ''; // Limpiar el grid antes de renderizar

    lista.forEach((juego) => {
        //Creamos el html de cada card
        const card = document.createElement('article');
        card.className = "bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 flex flex-col";
        //
        card.innerHTML = `
            <img
                src="${juego.imagen}"
                alt="${juego.nombre}"
                class="h-40 w-full object-cover"
            />
            <div class="p-4 flex flex-col gap-2 flex-1">
                <h3 class="text-md font-semibold text-slate-900">${juego.nombre}</h3>
                <p class="text-sm text-slate-500 flex-1">${juego.descripcion}</p>
                <p class="text-sm text-slate-500 flex-1">⭐ ${juego.rating}</p>
                <button class="mt-auto px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800">
                    Comprar
                </button>
            </div>
        `;

        //Agregamos la card al grid
        grid.appendChild(card);
    });

}

renderizarVideojuegos(videojuegos);
