<?php
    include_once __DIR__.'/database.php';

    $servicio = file_get_contents('php://input');
    $data = array(
        'status' => 'error',
        'message' => 'Ya existe un servicio con ese nombre'
    );

    $jsonOBJ = json_decode($servicio);
    $id = intval($_POST['id']);
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $tipo = $_POST['tipo'];
    $precio = intval($_POST['precio']);

    $query1 = "UPDATE servicio SET nombre = '{$nombre}', descripcion = '{$descripcion}', tipo = '{$tipo}', precio = '{$precio}', eliminado = 0 WHERE id = '{$id}'";
    if($conexion->query($query1)){
        $data['status'] = "success";
        $data['message'] = "Servicio modificado";
    } else {
        $data['message'] = "ERROR: No se ejecuto $query1. "; //mysqli_error($conexion);
    }

    $conexion->close();
    echo json_encode($data, JSON_PRETTY_PRINT);
?>