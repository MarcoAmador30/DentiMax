if('token' in localStorage == true){
    window.location.replace('/dentimax/index.html');
}

function validarFormulario(){
    let error = false;

    if($("#correoIngreso").val() == ''){
        error = true;
    }
    if($("#contrasenaIngreso").val() == ''){
        error = true;
    }

    if(error == true){
        $('#iniciarSesion').attr('disabled', true);
    }
    else{
        $('#iniciarSesion').attr('disabled', false);
    }
}

$(document).ready(function(){
    validarFormulario();

    $("#correoIngreso").blur(function(){
        if($("#correoIngreso").val() == ''){
            $("#errorCorreoIngreso").html('Favor de ingresar su correo electronico');
            validarFormulario();
        }
        else{
            $("#errorCorreoIngreso").html('');
            validarFormulario();
        }
    });

    $("#contrasenaIngreso").blur(function(){
        if($("#contrasenaIngreso").val() == ''){
            $("#errorContrasenaIngreso").html('Favor de ingresar su contraseña');
            validarFormulario();
        }
        else{
            $("#errorContrasenaIngreso").html('');
            validarFormulario();
        }
    });

    $("#iniciarSesion").click(function(){
        let error = false;
        let correo = $("#correoIngreso").val();
        let contrasena = $("#contrasenaIngreso").val();

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
        if(error == false){
            $.ajax({
                url: 'backend/login.php',
                type: 'GET',
                data: { correo: correo, contrasena: contrasena},
                success: function(response){
                    const cuentas = JSON.parse(response);
                    if(Object.keys(cuentas).length > 0){
                        let sesion = { 'tipo': cuentas['tipoCuenta'], 'idCuenta': cuentas['idCuenta']};
                        localStorage.setItem('token', JSON.stringify(sesion));
                        
                        if(cuentas['tipoCuenta'] == 0){
                            window.location.replace('/dentimax/panelUsuario.html');
                        }
                        else if(cuentas['tipoCuenta'] == 1){
                            window.location.replace('/dentimax/panelDentista.html');
                        }
                    }
                    else{
                        $("#errorInicio").html('Correo o contraseña incorrecto');
                    }
                }
            });
        }
    });
});