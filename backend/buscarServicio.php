<?php
    include_once __DIR__.'/database.php';

    $busqueda = $_GET['busqueda'];
    $data1 = array();

    if($result1 = $conexion->query("SELECT * FROM servicio WHERE (nombre like '%$busqueda%' OR tipo like '%$busqueda%') AND eliminado = 0")){
        $rows = $result1->fetch_all(MYSQLI_ASSOC);

        if(!is_null($rows)){
            foreach($rows as $num => $row){
                foreach($row as $key => $value){
                    $data1[$num][$key] = $value;
                }
            }
        }
    } else {
        die('QUery Error: '.mysqli_error($conexion));
    }

    $conexion->close();

    echo json_encode($data1, JSON_PRETTY_PRINT);
?>