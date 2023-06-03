if('token' in localStorage == false){
    window.location.replace('/dentimax/index.html');
}
else{
    var sesion = JSON.parse(localStorage.getItem('token'));
}

function formatearCitas(){
    $.ajax({
        url: 'backend/citasUsuario.php',
        type: 'GET',
        data: {id: sesion.idCuenta},
        success: function(response){
            const citas = JSON.parse(response);
            if(Object.keys(citas).length > 0){
                let templateProximaCita = `
                <div class="row">
                    <div class="col-12">
                        <h2 class="display-6">PROXIMA CITA</h2>
                    </div>
                    <div class="col-8">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d524.281381437386!2d-99.24209481131658!3d19.665313088878694!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d21f9801f367bb%3A0x5497d1b7b0bd6096!2sAgua%20Vida!5e0!3m2!1ses!2smx!4v1680895394410!5m2!1ses!2smx" width="250" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div class="col-2">
                        <img src="img/calendario.png" alt="calendario" width="25px" height="25px"> <small id="fecha">${citas[0].dia}/${citas[0].mes}/2023</small>
                        <img src="img/dentista.png" alt="calendario" width="25px" height="25px"> <small id="dentista">Luis de la Cruz</small>
                        <div class="w-100 py-1">
                            <button class="btn btn-dark">Cambiar</button>
                        </div>
                        <div class="w-100 py-1">
                            <button class="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
                `;
                $("#proximaCita").html(templateProximaCita);

                let templateProximasCitas = '';
                let templateCitasPasadas = '';
                citas.forEach(element => {
                    if(element.completado == 0){
                        templateProximasCitas += `
                        <li class="list-group-item">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <p>${element.nombre} - ${element.dia}/${element.mes}/2023 - ${element.hora} - $100</p>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-dark">Cambiar</button>
                                    <div class="w-100 d-block d-sm-block d-md-none py-1"></div>
                                    <button class="btn btn-danger">Cancelar</button>
                                </div>
                            </div>
                        </li>
                        `;
                    }
                    else if(element.completado == 1){
                        templateCitasPasadas += `
                        <li class="list-group-item">${element.nombre} - ${element.dia}/${element.mes}/2023 - ${element.hora} - $100</li>
                        `;
                    }
                });
                if(templateProximasCitas != ''){
                    $("#proximasCitas").html(templateProximasCitas);
                }
                if(templateCitasPasadas != ''){
                    $("#citasPasadas").html(templateCitasPasadas);
                }
            }
        }
    })
}

$(document).ready(function(){
    $("#cerrarSesion").click(function(){
        localStorage.clear();
        window.location.replace('/dentimax/index.html');
    });

    formatearCitas();
    
    $.ajax({
        url: 'backend/singleUsuario.php',
        type: 'GET',
        data: {id: sesion.idCuenta},
        success: function(response){
            const cuenta = JSON.parse(response);
            if(Object.keys(cuenta).length > 0){
                $("#nombreCorto").html(cuenta[0].nombre);
                $("#nombreCompleto").html(cuenta[0].nombre + ' ' + cuenta[0].apellidoP + ' ' + cuenta[0].apellidoM);
                $("#fechaNacimiento").html(cuenta[0].fechaNacimiento);
                $("#sexo").html(cuenta[0].sexo);
            }
        }
    });
});