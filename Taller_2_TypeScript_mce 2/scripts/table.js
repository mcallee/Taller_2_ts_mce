"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./data");
// Obtengo el elemento donde quiero insertar la tabla y el detalle de la serie
var tableContainer = document.getElementById('table-container');
var detailContainer = document.getElementById('detail-container');
if (tableContainer && detailContainer) {
    // Creo el contenido HTML de la tabla
    var tableHTML_1 = "\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th scope=\"col\">#</th>\n                <th scope=\"col\">Nombre</th>\n                <th scope=\"col\">Canal</th>\n                <th scope=\"col\">Temporadas</th>\n            </tr>\n        </thead>\n        <tbody>\n    ";
    // Itero sobre las series y agrego cada una como una fila en la tabla
    data_1.series.forEach(function (serie) {
        tableHTML_1 += "\n            <tr data-id=\"".concat(serie.id, "\" class=\"serie-row\">\n                <th scope=\"row\">").concat(serie.id, "</th>\n                <td>").concat(serie.name, "</td>\n                <td>").concat(serie.channel, "</td>\n                <td>").concat(serie.seasons, "</td>\n            </tr>\n        ");
    });
    // Cierro la etiqueta tbody antes de abrir tfoot
    tableHTML_1 += "\n        </tbody>\n    </table>\n    ";
    // Inserto la tabla en el contenedor
    tableContainer.innerHTML = tableHTML_1;
    // Agrego el evento click a cada fila de la tabla
    var serieRows = document.querySelectorAll('.serie-row');
    serieRows.forEach(function (row) {
        row.addEventListener('click', function () {
            var serieId = parseInt(row.getAttribute('data-id') || '0');
            var serie = null;
            // Busco la serie con el ID correspondiente
            data_1.series.forEach(function (s) {
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
}
else {
    console.error("No se encontró el elemento con el ID 'table-container' o 'detail-container'");
}
// Función para mostrar el detalle de la serie
function showSerieDetail(serie) {
    var detailHTML = "\n    <div class=\"card\">\n        <img src=\"".concat(serie.image, "\" class=\"card-img-top\" alt=\"").concat(serie.name, "\">\n        <div class=\"card-body\">\n            <h5 class=\"card-title\">").concat(serie.name, "</h5>\n            <p class=\"card-text\">").concat(serie.description, "</p>\n            <a href=\"").concat(serie.link, "\" class=\"btn btn-primary\">M\u00E1s informaci\u00F3n</a>\n        </div>\n    </div>\n    ");
    // Inserto el detalle en el contenedor
    if (detailContainer) {
        detailContainer.innerHTML = detailHTML;
    }
}
