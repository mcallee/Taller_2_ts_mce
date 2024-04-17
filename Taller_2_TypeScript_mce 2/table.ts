import { series } from "./data";
import { Serie } from "./serie";

// Obtengo el elemento donde quiero insertar la tabla y el detalle de la serie
const tableContainer = document.getElementById('table-container');
const detailContainer = document.getElementById('detail-container');

if (tableContainer && detailContainer) {
    // Creo el contenido HTML de la tabla
    let tableHTML = `
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Canal</th>
                <th scope="col">Temporadas</th>
            </tr>
        </thead>
        <tbody>
    `;

    // Itero sobre las series y agrego cada una como una fila en la tabla
    series.forEach(serie => {
        tableHTML += `
            <tr data-id="${serie.id}" class="serie-row">
                <th scope="row">${serie.id}</th>
                <td>${serie.name}</td>
                <td>${serie.channel}</td>
                <td>${serie.seasons}</td>
            </tr>
        `;
    });

    // Cierro la etiqueta tbody antes de abrir tfoot
    tableHTML += `
        </tbody>
    </table>
    `;

    // Inserto la tabla en el contenedor
    tableContainer.innerHTML = tableHTML;

    // Agrego el evento click a cada fila de la tabla
    const serieRows = document.querySelectorAll('.serie-row');
    serieRows.forEach(row => {
        row.addEventListener('click', () => {
            const serieId = parseInt(row.getAttribute('data-id') || '0');
            let serie: Serie | null = null;
            // Busco la serie con el ID correspondiente
            series.forEach(s => {
                if (s.id === serieId) {
                    serie = s;
                }
            });
            if (serie) {
                // Muestro el detalle de la serie
                showSerieDetail(serie);
            }
        });
    });
} else {
    console.error("No se encontró el elemento con el ID 'table-container' o 'detail-container'");
}

// Función para mostrar el detalle de la serie
function showSerieDetail(serie) {
    const detailHTML = `
    <div class="card">
        <img src="${serie.image}" class="card-img-top" alt="${serie.name}">
        <div class="card-body">
            <h5 class="card-title">${serie.name}</h5>
            <p class="card-text">${serie.description}</p>
            <a href="${serie.link}" class="btn btn-primary">Más información</a>
        </div>
    </div>
    `;
    // Inserto el detalle en el contenedor
    if (detailContainer) {
        detailContainer.innerHTML = detailHTML;
    }
}
