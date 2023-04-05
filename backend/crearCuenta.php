<?php
    include_once __DIR__.'/database.php';

    $cuenta = file_get_contents('php://input');
    $data = array(
        'status' => 'error',
        'message' => 'Ya existe una cuenta con ese nombre'
    );
    if(!empty($cuenta)){
        $jsonOBJ = json_decode($cuenta);
        $correo = $_POST['correoRegistro'];
        $nombre = $_POST['nombreRegistro'];
        $apellidoP = $_POST['apellidoPRegistro'];
        $apellidoM = $_POST['apellidoMRegistro'];
        $fecha = $_POST['fecha'];
        $sexo = $_POST['sexo'];
        $contrasena = $_POST['contrasenaRegistro'];

        $query1 = "INSERT INTO cuenta VALUES(null, '{$nombre}', '{$apellidoP}', '{$apellidoM}', '{$fecha}', '{$sexo}', 0)";
        $crearCuenta = $conexion->query($query1);
        $ultimoID = mysqli_insert_id($conexion);

        $query2 = "INSERT INTO usuario VALUES(null, '{$correo}', '{$contrasena}', 0, '{$ultimoID}', 0)";
        //$crearUsuario = $conexion->query($query2);
        if($conexion->query($query2)){
            $data['status'] = "success";
            $data['message'] = "Usuario agregado";
        } else {
            $data['message'] = "ERROR: No se ejecuto $query2. "; //mysqli_error($conexion);
        }
    }

    $conexion->close();
    echo json_encode($data, JSON_PRETTY_PRINT);
?>