<?php
    include_once __DIR__.'/database.php';

    $servicio = file_get_contents('php://input');
    $data = array(
        'status' => 'error',
        'message' => 'Ya existe un servicio con ese nombre'
    );

    $jsonOBJ = json_decode($servicio);
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $tipo = $_POST['tipo'];
    $precio = intval($_POST['precio']);

    $query1 = "INSERT INTO servicio VALUES(null, '{$nombre}', '{$descripcion}', '{$tipo}', '{$precio}', 0)";
    if($conexion->query($query1)){
        $data['status'] = "success";
        $data['message'] = "Servicio agregado";
    } else {
        $data['message'] = "ERROR: No se ejecuto $query1. "; //mysqli_error($conexion);
    }

    $conexion->close();
    echo json_encode($data, JSON_PRETTY_PRINT);
?>