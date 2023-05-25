const fecha = new Date();
const anho = fecha.getFullYear();
const mes = fecha.getMonth() + 1;
const mesPalabras = new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(new Date());
const dia = fecha.getDate();
var diaSeleccionado = 0;

function generarCalendario(){
    let calendario = '';
    switch(mes){
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            calendario = `<table id="calendario" cellspacing="5" cellpadding="13" class="redondo bordeTabla">
            <tbody>
                <td colspan="7" class="bordeTabla primeraFila">MAYO 2023</td>
                <tr class="bordeTabla segundaFila">
                    <th scope="col" class="bordeTabla">Lun</th>
                    <th scope="col" class="bordeTabla">Mar</th>
                    <th scope="col" class="bordeTabla">Mie</th>
                    <th scope="col" class="bordeTabla">Jue</th>
                    <th scope="col" class="bordeTabla">Vie</th>
                    <th scope="col" class="bordeTabla">Sab</th>
                    <th scope="col" class="bordeTabla">Dom</th>
                </tr>
                <tr>
                    <td class="bordeTabla casillaDisponible" id="1">1</td>
                    <td class="bordeTabla casillaDisponible" id="2">2</td>
                    <td class="bordeTabla casillaDisponible" id="3">3</td>
                    <td class="bordeTabla casillaDisponible" id="4">4</td>
                    <td class="bordeTabla casillaDisponible" id="5">5</td>
                    <td class="bordeTabla casillaDisponible" id="6">6</td>
                    <td class="bordeTabla casillaNoDisponible">7</td>
                </tr>
                <tr>
                    <td class="bordeTabla casillaDisponible" id="8">8</td>
                    <td class="bordeTabla casillaDisponible" id="9">9</td>
                    <td class="bordeTabla casillaDisponible" id="10">10</td>
                    <td class="bordeTabla casillaDisponible" id="11">11</td>
                    <td class="bordeTabla casillaDisponible" id="12">12</td>
                    <td class="bordeTabla casillaDisponible" id="13">13</td>
                    <td class="bordeTabla casillaNoDisponible">14</td>
                </tr>
                <tr>
                    <td class="bordeTabla casillaDisponible" id="15">15</td>
                    <td class="bordeTabla casillaDisponible" id="16">16</td>
                    <td class="bordeTabla casillaDisponible" id="17">17</td>
                    <td class="bordeTabla casillaDisponible" id="18">18</td>
                    <td class="bordeTabla casillaDisponible" id="19">19</td>
                    <td class="bordeTabla casillaDisponible" id="20">20</td>
                    <td class="bordeTabla casillaNoDisponible">21</td>
                </tr>
                <tr>
                    <td class="bordeTabla casillaDisponible" id="22">22</td>
                    <td class="bordeTabla casillaDisponible" id="23">23</td>
                    <td class="bordeTabla casillaDisponible" id="24">24</td>
                    <td class="bordeTabla casillaDisponible" id="25">25</td>
                    <td class="bordeTabla casillaDisponible" id="26">26</td>
                    <td class="bordeTabla casillaDisponible" id="27">27</td>
                    <td class="bordeTabla casillaNoDisponible">28</td>
                </tr>
                <tr>
                    <td class="bordeTabla casillaDisponible" id="29">29</td>
                    <td class="bordeTabla casillaDisponible" id="30">30</td>
                    <td class="bordeTabla casillaDisponible" id="31">31</td>
                    <td class="bordeTabla casillaNoDisponible">1</td>
                    <td class="bordeTabla casillaNoDisponible">2</td>
                    <td class="bordeTabla casillaNoDisponible">3</td>
                    <td class="bordeTabla casillaNoDisponible">4</td>
                </tr>
            </tbody>
        </table>`;
            break;
        case 6:
            break;
        case 7:
            break;
        case 8:
            break;
        case 9:
            break;
        case 10:
            break;
        case 11:
            break;
        case 12:
            break;
    }
    $("#tablaCalendario").html(calendario);
}

function formatearCalendario(){
    for(i = 0; i <= dia - 1; i++){
        let day = "#" + i.toString();
        $(day).attr('class', 'bordeTabla casillaNoDisponible');
    }
}

function obtenerFechas(){
    $.ajax({
        url: 'backend/listarCitas.php',
        type: 'GET',
        data: {mes: mes, dia: dia},
        success: function(response){
            const citas = JSON.parse(response);
            if(Object.keys(citas).length > 0){
                return citas;
            }
            else{
                return null;
            }
        }
    });
}

$(document).ready(function(){
    generarCalendario();
    formatearCalendario();
    const fechas = obtenerFechas();

    //if(citas != null){}

    $(document).on('click', '.casillaDisponible', function(){
        if(diaSeleccionado != 0){
            $('#' + diaSeleccionado.toString()).attr('class', 'bordeTabla casillaDisponible');
        }
        diaSeleccionado = $(this)[0].innerHTML;
        $('#' + diaSeleccionado.toString()).attr('class', 'bordeTabla casillaSeleccionada');
        $("#day").html(diaSeleccionado + ' de ' + mesPalabras + ' del ' + anho);
        let template = '';
        let horas = [];
        let horasDisponibles= ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
        if(Object.keys(fecha).length > 0){
            fechas.forEach(element => {
                if(element.dia == diaSeleccionado){
                    horas.push([element.hora, element.duracion]);
                }
            })
            horas.forEach(element => {
                let posicionHora = 0;
                switch(element.hora){
                    case '10:00':
                        posicionHora = 0;
                        break;
                    case '10:30':
                        posicionHora = 1;
                        break;
                    case '11:00':
                        posicionHora = 2;
                        break;
                    case '11:30':
                        posicionHora = 3;
                        break;
                    case '12:00':
                        posicionHora = 4;
                        break;
                    case '12:30':
                        posicionHora = 5;
                        break;
                    case '13:00':
                        posicionHora = 6;
                        break;
                    case '13:30':
                        posicionHora = 7;
                        break;
                    case '14:00':
                        posicionHora = 8;
                        break;
                    case '14:30':
                        posicionHora = 9;
                        break;
                    case '15:00':
                        posicionHora = 10;
                        break;
                    case '15:30':
                        posicionHora = 11;
                        break;
                    case '16:00':
                        posicionHora = 12;
                        break;
                    case '16:30':
                        posicionHora = 13;
                        break;
                    case '17:00':
                        posicionHora = 14;
                        break;
                    case '17:30':
                        posicionHora = 15;
                        break;
                }
                for(i = 0; i < element.duracion; i++){
                    horasDisponibles.pop(posicionHora);
                    posicionHora++;
                }
                horasDisponibles.forEach(element => {
                    template += `<option value="${element}">${element}</option>`;
                })
            })
        }
        else{
            template = `
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="15:30">15:30</option>
                <option value="16:00">16:00</option>
                <option value="16:30">16:30</option>
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
            `;
        }
        $("#hora").html(template);
    });
});