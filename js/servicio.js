function fetchServices(){
    $.ajax({
        url: 'backend/listarServicios.php',
        type: 'GET',
        success: function(response){
            const listarServicios = JSON.parse(response);
            if(Object.keys(listarServicios).length > 0){
                let serviciosDivision = '';
                let serviciosRestauraciones = '';
                let serviciosProtesis = '';
                let serviciosCirugias = '';
                let template = '';
                listarServicios.forEach(element => {
                    if(element.tipo == 'Division'){
                        if(element.nombre == 'Limpieza Dental'){
                            serviciosDivision += `
                            <div class="row justify-content-center align-items-center servicio py-3">
                                <div class="col-12 col-md-8">
                                    <div class="row">
                                        <div class="col-2 col-md-1">
                                            <img src="img/icono_division.jpg" class="img-fluid" width="73.5" height="84">
                                        </div>
                                        <div class="col-10 col-md-11">
                                            <h2 class="titulo">${element.nombre}</h2>
                                            <p class="descripcion">${element.descripcion}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4 align-items-center text-center">
                                    <h6 class="precio">$${element.precio}</h6>
                                    <button class="btn btn-dark">SOLICITAR</button>
                                </div>
                            </div>
                            `;
                        }
                        else{
                            serviciosDivision += `
                            <div class="row justify-content-center align-items-center servicio py-3">
                                <div class="col-12 col-md-8">
                                    <div class="row">
                                        <div class="col-2 col-md-1">
                                            <img src="img/icono_division.jpg" class="img-fluid" width="73.5" height="84">
                                        </div>
                                        <div class="col-10 col-md-11">
                                            <h2 class="titulo">${element.nombre}</h2>
                                            <p class="descripcion">${element.descripcion}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4 align-items-center text-center">
                                    <button class="btn btn-dark">SOLICITAR</button>
                                </div>
                            </div>
                            `;
                        }
                    }
                    if(element.tipo == 'Restauraciones Dentales'){
                        serviciosRestauraciones += `
                        <div class="row justify-content-center align-items-center servicio py-3">
                            <div class="col-12 col-md-8">
                                <div class="row">
                                    <div class="col-2 col-md-1">
                                        <img src="img/icono_restauracion.jpg" class="img-fluid" width="73.5" height="84">
                                    </div>
                                    <div class="col-10 col-md-11">
                                        <h2 class="titulo">${element.nombre}</h2>
                                        <p class="descripcion">${element.descripcion}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-4 align-items-center text-center">
                                <button class="btn btn-dark">SOLICITAR</button>
                            </div>
                        </div>
                        `;
                    }
                    if(element.tipo == 'Protesis Dentales'){
                        serviciosProtesis += `
                        <div class="row justify-content-center align-items-center servicio py-3">
                            <div class="col-12 col-md-8">
                                <div class="row">
                                    <div class="col-2 col-md-1">
                                        <img src="img/icono_protesis.jpg" class="img-fluid" width="73.5" height="84">
                                    </div>
                                    <div class="col-10 col-md-11">
                                        <h2 class="titulo">${element.nombre}</h2>
                                        <p class="descripcion">${element.descripcion}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-4 align-items-center text-center">
                                <button class="btn btn-dark">SOLICITAR</button>
                            </div>
                        </div>
                        `;
                    }
                    if(element.tipo == 'Cirugias Dentales'){
                        serviciosCirugias += `
                        <div class="row justify-content-center align-items-center servicio py-3">
                            <div class="col-12 col-md-8">
                                <div class="row">
                                    <div class="col-2 col-md-1">
                                        <img src="img/icono_cirugia.jpg" class="img-fluid" width="73.5" height="84">
                                    </div>
                                    <div class="col-10 col-md-11">
                                        <h2 class="titulo">${element.nombre}</h2>
                                        <p class="descripcion">${element.descripcion}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-4 align-items-center text-center">
                                <button class="btn btn-dark">SOLICITAR</button>
                            </div>
                        </div>
                        `;
                    }
                });
                $("#division").html(serviciosDivision);
                $("#restauraciones").html(serviciosRestauraciones);
                $("#protesis").html(serviciosProtesis);
                $("#cirugias").html(serviciosCirugias);
            }
        }
    });
}

$(document).ready(function(){
    fetchServices();

    $("#buscar").keyup(function(){
        let busqueda = $("#buscar").val();
        if (busqueda == ''){
            $("#total").html(`
                <h2 class="display-6 py-3 textoCentro">DIVISIÓN</h2>
                <div id="division"></div>
                <h2 class="display-6 py-3 textoCentro">RESTAURACIONES DENTALES</h2>
                <div id="restauraciones"></div>
                <h2 class="display-6 py-3 textoCentro">PROTESIS DENTALES</h2>
                <div id="protesis"></div>
                <h2 class="display-6 py-3 textoCentro">CIRUGIAS DENTALES</h2>
                <div id="cirugias"></div>
            `);
            fetchServices();
        }
        else{
            $.ajax({
                url: 'backend/buscarServicio.php',
                type: 'GET',
                data: {busqueda: busqueda},
                success: function(response){
                    let respuesta = JSON.parse(response);
                    let plantilla = '';
                    respuesta.forEach(resultado => {
                        if(resultado.tipo == 'Division'){
                            if(resultado.nombre == 'Limpieza Dental'){
                                plantilla += `
                                    <div class="row justify-content-center align-items-center servicio py-3">
                                        <div class="col-12 col-md-8">
                                            <div class="row">
                                                <div class="col-1">
                                                    <img src="img/icono_division.jpg" class="img-fluid" width="73.5" height="84">
                                                </div>
                                                <div class="col-11">
                                                    <h2 class="titulo">${resultado.nombre} - ${resultado.tipo}</h2>
                                                    <p class="descripcion">${resultado.descripcion}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4 align-items-center text-center">
                                            <h6 class="precio">${resultado.precio}</h6>
                                            <button class="btn btn-dark">SOLICITAR</button>
                                        </div>
                                    </div>
                                `
                            }
                            else{
                                plantilla += `
                                    <div class="row justify-content-center align-items-center servicio py-3">
                                        <div class="col-12 col-md-8">
                                            <div class="row">
                                                <div class="col-1">
                                                    <img src="img/icono_division.jpg" class="img-fluid" width="73.5" height="84">
                                                </div>
                                                <div class="col-11">
                                                    <h2 class="titulo">${resultado.nombre} - ${resultado.tipo}</h2>
                                                    <p class="descripcion">${resultado.descripcion}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4 align-items-center text-center">
                                            <button class="btn btn-dark">SOLICITAR</button>
                                        </div>
                                    </div>
                                `
                            }
                        }
                        else if(resultado.tipo == 'Restauraciones Dentales'){
                            if(resultado.nombre == 'Limpieza Dental'){
                                plantilla += `
                                    <div class="row justify-content-center align-items-center servicio py-3">
                                        <div class="col-12 col-md-8">
                                            <div class="row">
                                                <div class="col-1">
                                                    <img src="img/icono_restauracion.jpg" class="img-fluid" width="73.5" height="84">
                                                </div>
                                                <div class="col-11">
                                                    <h2 class="titulo">${resultado.nombre} - ${resultado.tipo}</h2>
                                                    <p class="descripcion">${resultado.descripcion}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `
                            }
                            else{
                                plantilla += `
                                    <div class="row justify-content-center align-items-center servicio py-3">
                                        <div class="col-12 col-md-8">
                                            <div class="row">
                                                <div class="col-1">
                                                    <img src="img/icono_restauracion.jpg" class="img-fluid" width="73.5" height="84">
                                                </div>
                                                <div class="col-11">
                                                    <h2 class="titulo">${resultado.nombre} - ${resultado.tipo}</h2>
                                                    <p class="descripcion">${resultado.descripcion}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4 align-items-center text-center">
                                            <button class="btn btn-dark">SOLICITAR</button>
                                        </div>
                                    </div>
                                `
                            }
                        }
                        else if(resultado.tipo == 'Protesis Dentales'){
                            if(resultado.nombre == 'Limpieza Dental'){
                                plantilla += `
                                    <div class="row justify-content-center align-items-center servicio py-3">
                                        <div class="col-12 col-md-8">
                                            <div class="row">
                                                <div class="col-1">
                                                    <img src="img/icono_protesis.jpg" class="img-fluid" width="73.5" height="84">
                                                </div>
                                                <div class="col-11">
                                                    <h2 class="titulo">${resultado.nombre} - ${resultado.tipo}</h2>
                                                    <p class="descripcion">${resultado.descripcion}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `
                            }
                            else{
                                plantilla += `
                                    <div class="row justify-content-center align-items-center servicio py-3">
                                        <div class="col-12 col-md-8">
                                            <div class="row">
                                                <div class="col-1">
                                                    <img src="img/icono_protesis.jpg" class="img-fluid" width="73.5" height="84">
                                                </div>
                                                <div class="col-11">
                                                    <h2 class="titulo">${resultado.nombre} - ${resultado.tipo}</h2>
                                                    <p class="descripcion">${resultado.descripcion}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4 align-items-center text-center">
                                            <button class="btn btn-dark">SOLICITAR</button>
                                        </div>
                                    </div>
                                `
                            }
                        }
                        else if(resultado.tipo == 'Division'){
                            if(resultado.nombre == 'Cirugias Dentales'){
                                plantilla += `
                                    <div class="row justify-content-center align-items-center servicio py-3">
                                        <div class="col-12 col-md-8">
                                            <div class="row">
                                                <div class="col-1">
                                                    <img src="img/icono_cirugia.jpg" class="img-fluid" width="73.5" height="84">
                                                </div>
                                                <div class="col-11">
                                                    <h2 class="titulo">${resultado.nombre} - ${resultado.tipo}</h2>
                                                    <p class="descripcion">${resultado.descripcion}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `
                            }
                            else{
                                plantilla += `
                                    <div class="row justify-content-center align-items-center servicio py-3">
                                        <div class="col-12 col-md-8">
                                            <div class="row">
                                                <div class="col-1">
                                                    <img src="img/icono_cirugia.jpg" class="img-fluid" width="73.5" height="84">
                                                </div>
                                                <div class="col-11">
                                                    <h2 class="titulo">${resultado.nombre} - ${resultado.tipo}</h2>
                                                    <p class="descripcion">${resultado.descripcion}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4 align-items-center text-center">
                                            <button class="btn btn-dark">SOLICITAR</button>
                                        </div>
                                    </div>
                                `
                            }
                        }
                    });
                    $("#total").html(plantilla);
                }
            });
        }
    });
});