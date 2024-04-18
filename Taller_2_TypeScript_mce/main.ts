import { Serie } from './serie.js';
import { series } from './data.js';

const tablaSeries: HTMLElement = document.getElementById("series")!;
const promedioElemento: HTMLElement = document.getElementById("promedio")!;

showSeries(series);
showPromedio(series);

function showSeries(series: Serie[]): void {
    const seriesTbody: HTMLElement = document.createElement("tbody");
    series.forEach(serie => {
        const trElement: HTMLElement = document.createElement("tr");
        trElement.innerHTML = `
            <td>${serie.id}</td>
            <td>${serie.titulo}</td>
            <td>${serie.plataforma}</td>
            <td>${serie.temporadas}</td>`;
        trElement.addEventListener('click', () => {
            mostrarDetalle(serie);
        });
        seriesTbody.appendChild(trElement);
    });
    tablaSeries.appendChild(seriesTbody);
}

function mostrarDetalle(serie: Serie): void {
    const detalleCard: HTMLElement = document.getElementById("detalle")!;
    detalleCard.innerHTML = `
        <div class="card">
            <img src="resources/${serie.img}" class="card-img-top" alt="${serie.titulo}">
            <div class="card-body">
                <h5 class="card-title">${serie.titulo}</h5>
                <p class="card-text">${serie.descripcion}</p>
                <a href="${serie.url}" class="btn btn-primary">Ver más</a>
            </div>
        </div>`;
}

function calcPromedio(series: Serie[]): number {
    const totalTemp = series.reduce((sum, serie) => sum + serie.temporadas, 0);
    return totalTemp / series.length;
}

function showPromedio(series: Serie[]): void {
    const promedio: number = calcPromedio(series);
    const promedioRow: HTMLElement = document.createElement("tr");
    promedioRow.innerHTML = `<td colspan="4"><strong>Promedio de temporadas:</strong> ${promedio.toFixed(2)}</td>`;
    promedioElemento.appendChild(promedioRow);
}
