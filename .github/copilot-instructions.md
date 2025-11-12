## Propósito

Estas instrucciones ayudan a agentes de IA a ser productivos rápidamente en este repositorio: un sitio estático sencillo que usa Tailwind CSS y JavaScript vanila para renderizar un catálogo de videojuegos.

## Vista general (big picture)
- Proyecto estático: HTML en `public/`, CSS precompilado en `public/output.css`, y JS del cliente en `public/script.js`.
- Tailwind se usa para utilidades; el archivo fuente CSS está en `src/input.css` (actualmente solo importa Tailwind). `package.json` declara `tailwindcss` y `@tailwindcss/cli` como dependencias, pero no incluye scripts de build.
- Flujo de datos principal: `public/script.js` contiene un arreglo `videojuegos` (objetos con id, nombre, descripcion, rating, imagen) y la función `renderizarVideojuegos(lista)` que inserta cards en el contenedor `#grid-videojuegos` dentro de `public/index.html`.

## Archivos clave
- `public/index.html` — estructura HTML, incluye `output.css` y contiene el `div#grid-videojuegos` donde se renderizan las cards.
- `public/script.js` — lógica de renderizado y datos de prueba. Contiene el array `videojuegos` y la función `renderizarVideojuegos`.
- `public/output.css` — CSS resultante de Tailwind; se sirve directamente.
- `src/input.css` — entrada para Tailwind (puedes editarla y luego generar `output.css`).
- `package.json` — dependencias (Tailwind) pero sin scripts personalizados.

## Patrones y convenciones específicas del proyecto
- Vanilla JS en el cliente; no hay frameworks ni bundlers. Mantén cambios simples y compatibles con navegadores modernos.
- CSS: usan utilidades de Tailwind directamente en el HTML/JS (clases como `text-slate-900`, `rounded-xl`, `grid-cols-1 sm:grid-cols-2 ...`). Evitar introducir CSS globales sin justificar.
- Estructura de datos: los videojuegos siguen la forma { id, nombre, descripcion, rating, imagen }. Mantén las mismas claves al ampliar datos o al consumir APIs.

## Ejemplos útiles (del código)
- Contenedor donde inyectar cards: `document.querySelector('#grid-videojuegos')` en `public/script.js`.
- Ejemplo de item: { id: 1, nombre: "Elden Ring", descripcion: "Acción · RPG · PC / PS5 / Xbox", rating: 4.8, imagen: "https://..." }.

## Flujo de trabajo recomendado (comandos)
1) Generar CSS Tailwind (si editas `src/input.css`):

   PowerShell:

   npx tailwindcss -i src/input.css -o public/output.css --minify

   o en modo desarrollo con watch:

   npx tailwindcss -i src/input.css -o public/output.css --watch

2) Servir el directorio `public/` para probar en navegador (puedes usar Live Server en VS Code o un servidor estático):

   npx http-server ./public -p 8080

Nota: `package.json` no incluye scripts por ahora — agregar scripts útiles (`build:css`, `dev:css`, `start`) es una mejora aceptable.

## Errores comunes y puntos de atención
- `public/script.js` contiene HTML inyectado y actualmente tiene fragmentos incompletos / sintaxis rota (p. ej. etiquetas `<h3>`/`<button>` mal formadas). Antes de modificar, abre el archivo en el navegador y revisa la consola para errores de JS.
- Si añades clases Tailwind nuevas, recuerda regenerar `public/output.css` (si no estás usando watch) para que las utilidades existan.
- Las imágenes en los objetos son URLs externas; validar CORS/https si cambias fuente de datos.

## Pull requests y revisiones rápidas
- PRs pequeñas preferidas. Para cambios en CSS, incluye el comando usado para generar `output.css` o añade el script en `package.json`.
- Añade una línea en el README cuando la estructura del proyecto cambie (p. ej. si introduces un bundler o backend).

## Qué no documentar aquí
- No incluyas reglas de estilo genéricas: documenta solo patrones observables en el repo.

Si alguna sección es confusa o falta detalle (por ejemplo, quieres que documente una convención de nombres o un comando npm), dime qué parte ampliar y lo actualizo.
