function fetchServices(){
    $.ajax({
        url: 'backend/listarServicios.php',
        type: 'GET',
        success: function(response){
            const listaServicios = JSON.parse(response);
            if(Object.keys(listaServicios).length > 0){
                let template = '';
                listaServicios.forEach(element => {
                    template += `
                        <tr>
                            <th scope="col" class="idServicio">${element.id}</th>
                            <td>${element.nombre}</td>
                            <td>${element.descripcion}</td>
                            <td>${element.tipo}</td>
                            <td><button class="btn btn-danger serviceDelete">Eliminar</button></td>
                        </tr>
                    `;
                });
                $("#servicios").html(template);
            }
        }
    });
}

function validacion(){
    let error = false;

    if($("#nombre").val() == ''){
        error = true;
    }
    if($("#descripcion").val() == ''){
        error = true;
    }
    if($("#precio").val() == ''){
        error = true;
    }

    console.log(error);
    if(error == true){
        $("#crear").attr('disabled', true);
    }
    else{
        $("#crear").attr('disabled', false);
    }
}

function activarModificacion(){
    if(editar == true){
        $("#cancelarModificar").attr('disabled', false);
    }
    else{
        $("#cancelarModificar").attr('disabled', true);
    }
}

$(document).ready(function(){
    editar = false;
    id = 0;

    fetchServices();

    $("#nombre").blur(function(){
        if($("#nombre").val() == ''){
            $("#errorNombre").html('Ingresar un nombre');
            validacion();
        }
        else{
            $("#errorNombre").html('');
            validacion();
        }
    });

    $("#descripcion").blur(function(){
        if($("#descripcion").val() == ''){
            $("#errorDescripcion").html('Ingresar una descipción');
            validacion();
        }
        else{
            $("#errorDescripcion").html('');
            validacion();
        }
    });

    $("#precio").blur(function(){
        if($("#precio").val() == ''){
            $("#errorPrecio").html('Favor de ingresar un precio, en caso de no querer poner uno, dejarlo en 0');
            validacion();
        }
        else{
            $("#errorPrecio").html('');
            validacion();
        }
    });

    $("#crear").click(function(){
        let error = false;
        let nombre = $("#nombre").val();
        let descipcion = $("#descripcion").val();
        let tipo = $("#tipo").val();
        let precio = parseInt($("#precio").val());

        if(nombre == ''){
            error = true;
            $("#errorNombre").html('Ingresar un nombre');
        }
        if(editar == false){
            if(nombre != ''){
                $.ajax({
                    url: 'backend/verificarServicios.php',
                    type: 'GET',
                    data: {nombre: nombre},
                    success: function(response){
                        const servicios = JSON.parse(response);
                        if(Object.keys(servicios).length > 0){
                            error = true;
                            console.log(error);
                            $("#errorCrear").html('Ya existe un servicio con ese nombre');
                        }
                        else{
                            $("errorCrear").html('');
                        }
                    }
                });
            }
        }
        if(descipcion == ''){
            error = true;
            $("#errorDescripcion").html('Ingresar una descripción');
        }
        if($("precio").val() == ''){
            error = true;
            $("#errorPrecio").html('Ingresar un precio');
        }
        if(precio < 0){
            error = true;
            $("#errorPrecio").html('No puede ingresar precios negativos');
        }

        if(error == false){
            let url = editar === false ? 'backend/crearServicio.php' : 'backend/actualizarServicio.php';
            console.log(id);
            const postData = {
                nombre: nombre,
                descripcion: descipcion,
                tipo: tipo,
                precio: precio,
                id: id
            };
            $.post(url, postData, function(response){
                console.log(response);
                $("#nombre").val('');
                $("#descripcion").val('');
                $("#precio").val('0');
                editar = false;
                fetchServices();
                validacion();
                activarModificacion();
            });
        }
    });

    $("#cancelarModificar").click(function(){
        editar = false;
        activarModificacion();
    });

    $(document).on('click', '.idServicio', function(){
        id = $(this)[0].innerHTML;
        $.ajax({
            url: 'backend/singleServicio.php',
            type: 'GET',
            data: {id: id},
            success: function(response){
                console.log(response);
                const servicio = JSON.parse(response);
                $("#nombre").val(servicio.nombre);
                $("#descripcion").val(servicio.descripcion);
                $("#tipo").val(servicio.tipo);
                $("#precio").val(servicio.precio);
                validacion();
                editar = true;
                activarModificacion();
            }
        });
    });

    $(document).on('click', '.serviceDelete', function(){
        if(confirm('¿Estás seguro/a de que deseas eliminar este servicio?')){
            id = $(this)[0].parentElement.parentElement.childNodes[1].innerHTML;
            $.post('backend/eliminarServicio.php', {id: id}, function(response){
                console.log(response);
                fetchServices();
            });
        }
    });
})