function cargarAños(){
    let template = ``;
    for(i = 2023; i >= 1905; i--){
        if(i != 2023){
            template += `<option value="${i}">${i}</option>`;
        }
        else{
            template += `<option value="${i}" selected>${i}</option>`;
        }
    }
    $("#anho").html(template);
}
$(document).ready(function(){
    cargarAños();

    $("#registrarse").click(function(){
        let error = false;
        let nombre = $("#nombreRegistro").val();
        let apellidoP = $("#apellidoPRegistro").val();
        let apellidoM = $("#apellidoMRegistro").val();
        let fecha = $("#dia").val() + $("#mes").val() + $("#anho").val();
        let sexo = $("#sexo").val();
        let correo = $("#correoRegistro").val();
        let contrasena = $("#contrasenaRegistro").val();
        if($("#nombreRegistro").val() == ''){
            $("#errorNombre").html('Favor de ingresar su nombre');
            error = true;
        }
        else{
            $("#errorNombre").html('');
        }
        if($("#apellidoPRegistro").val() == ''){
            $("#errorApellidoP").html('Favor de ingresar su apellido paterno');
            error = true;
        }
        else{
            $("#errorApellidoP").html('');
        }
        if($("#apellidoMRegistro").val() == ''){
            $("#errorApellidoM").html('Favor de ingresar su apellido materno');
            error = true;
        }
        else{
            $("#errorApellidoM").html('');
        }
        if($("#mes").val() == "2" || $("#mes").val() == "4" || $("#mes").val() == "6" || $("#mes").val() == "9" || $("#mes").val() == "11"){
            if($("#mes").val() != "2"){
                if($("#dia").val() == "31"){
                    $("#errorFecha").html('Fecha no valida');
                    error = true;
                }
                else{
                    $("#errorFecha").html('');
                }
            }
            else{
                if(parseInt($("#anho").val()) % 4 == 0 && parseInt($("#anho").val()) % 100 != 0){
                    if(parseInt($("#dia").val()) > 29){
                        $("#errorFecha").html('Fecha no valida');
                        error = true;
                    }
                    else{
                        $("#errorFecha").html('');
                    }
                }
                else{
                    if(parseInt($("#dia").val()) > 28){
                        $("#errorFecha").html('Fecha no valida');
                        error = true;
                    }
                    else{
                        $("errorFecha").html('');
                    }
                }
            }
        }
        if($("#correoRegistro").val() == ''){
            $("#errorCorreo").html('Favor de ingresar su correo electronico');
            error = true;
        }
        else{
            $("#errorCorreo").html('');
        }
        if($("#contrasenaRegistro").val() == ''){
            $("#errorContrasena").html('Favor de ingresar su contraseña');
            error = true;
        }
        else{
            $("#errorContrasena").html('');
        }
        if($("#confirmarContrasena").val() == ''){
            $("#errorCContrasena").html('Favor de confirmar su contraseña');
            error = true;
        }
        else{
            $("#errorCContrasena").html('');
        }
        if($("#contrasenaRegistro").val() != '' && $("#confirmarContrasena").val() != ''){
            if($("#contrasenaRegistro").val() == $("#confirmarContrasena").val()){
                $("#errorContrasena").html('');
                $("#errorCContrasena").html('');
            }
            else{
                $("#errorContrasena").html('Las contraseñas deben de coincidir');
                $("#errorCContrasena").html('Las contraseñas deben de coincidir');
                error = true;
            }
        }
        if(error == false){
            window.location.assign("/dentimax/backend/crearCuenta.php/?nombre=" + nombre + "&apellidoP=" + apellidoP + "&apellidoM=" + apellidoM + "&fecha=" + fecha + "&sexo=" + sexo + "&correo=" + correo + "&contrasena=" + contrasena);
        }
    });
});