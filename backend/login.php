<?php
    include_once __DIR__.'/database.php';

    if(isset($_POST['iniciarSesion'])){
        $correo = $_POST['correoIngreso'];
        $contrasena = $_POST['contrasenaIngreso'];

        $query1 = "SELECT * from usuario WHERE correo = '$correo' AND contrasena = '$contrasena' AND tipo = 0 AND eliminado = 0";
        $consulta1 = $conexion->query($query1);
        $paciente = mysqli_fetch_array($consulta1);
        $query2 = "SELECT * from usuario WHERE correo = '$correo' AND contrasena = '$contrasena' AND tipo = 1 AND eliminado = 0";
        $consulta2 = $conexion->query($query2);
        $dentista = mysqli_fetch_array($consulta2);
        if($consulta1->num_rows == 1){
            session_start();
            $_SESSION['autenticado'] = true;
            $_SESSION['idUsuario'] = $paciente['idCuenta'];
            header("Location: /dentimax/panelUsuario.html");
        }
        else if($consulta2->num_rows == 1){
            session_start();
            $_SESSION['autenticado'] = true;
            $_SESSION['idUsuario'] = $dentista['idCuenta'];
            header("Location: /dentimax/panelDentista.html");
        }
        else{
            header("Location: /dentimax/login.html");
        }
    }
?>