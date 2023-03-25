$(document).ready(function(){
    $("#iniciarSesion").click(function(){
        let error = false;

        if($("#correoIngreso").val() == ''){
            $("#errorCorreoIngreso").html('Favor de ingresar su correo electronico');
            error = true;
        }
        else{
            $("#errorCorreoIngreso").html('');
        }
        if($("#contrasenaIngreso").val() == ''){
            $("#errorContrasenaIngreso").html('Favor de ingresar su contraseña');
            error = true;
        }
        else{
            $("#errorContrasenaIngreso").html('');
        }
    });
});