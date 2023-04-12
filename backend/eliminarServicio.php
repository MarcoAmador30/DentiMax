<?php
    include_once __DIR__.'/database.php';

    $servicio = file_get_contents('php://input');
    $data = array(
        'status' => 'error',
        'message' => 'Ya existe un servicio con ese nombre'
    );

    $jsonOBJ = json_decode($servicio);
    $id = intval($_POST['id']);

    $query1 = "UPDATE servicio SET eliminado = 1 WHERE id = '{$id}'";
    if($conexion->query($query1)){
        $data['status'] = "success";
        $data['message'] = "Servicio eliminado";
    } else {
        $data['message'] = "ERROR: No se ejecuto $query1. "; //mysqli_error($conexion);
    }

    $conexion->close();
    echo json_encode($data, JSON_PRETTY_PRINT);
?>