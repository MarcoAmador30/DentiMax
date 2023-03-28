<?php
    include_once __DIR__.'/database.php';

    if(isset($_POST['registrarse'])){
        $correo = $_POST['correoRegistro'];
        $query1 = "SELECT * FROM usuario WHERE correo = '$correo'";
        $verificarCorreo = $conexion->query($query1);
        if($verificarCorreo->num_rows == 1){
            header("Location: /dentimax/registro.html");
        }
        else{
            $nombre = $_POST['nombreRegistro'];
            $apellidoP = $_POST['apellidoPRegistro'];
            $apellidoM = $_POST['apellidoMRegistro'];
            $dia = $_POST['dia'];
            $mes = $_POST['mes'];
            $anho = $_POST['anho'];
            $sexo = $_POST['sexo'];
            $contrasena = $_POST['contrasenaRegistro'];

            $query2 = "INSERT INTO cuenta VALUES(null, '{$nombre}', '{$apellidoP}', '{$apellidoM}', '{$dia}'-'{$mes}'-'{$anho}', '{$sexo}', 0)";
            $crearCuenta = $conexion->query($query2);
            $ultimoID = mysqli_insert_id($conexion);

            $query3 = "INSERT INTO usuario VALUES(null, '{$correo}', '{$contrasena}', 0, '{$ultimoID}', 0)";
            $crearUsuario = $conexion->query($query3);
            header("Location: /dentimax/panelUsuario.html");
        }
    }
?>