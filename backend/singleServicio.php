<?php
    include_once __DIR__.'/database.php';

    $data1 = array();
    $id = intval($_GET['id']);

    if($result = $conexion->query("SELECT * FROM servicio WHERE id = '{$id}' AND eliminado = 0")){
        while($row = mysqli_fetch_array($result)){
            $data1[] = array(
                'nombre' => $row['nombre'],
                'descripcion' => $row['descripcion'],
                'tipo' => $row['tipo'],
                'precio' => $row['precio']
            );
        };
    } else {
        die('Query Error: '.mysqli_error($conexion));
    }
    echo json_encode($data1[0]);
?>