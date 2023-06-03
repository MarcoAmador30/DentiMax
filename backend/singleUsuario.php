<?php
    include_once __DIR__.'/database.php';

    $data1 = array();

    $idCuenta = $_GET['id'];

    if($result = $conexion->query("SELECT * FROM cuenta WHERE id = '{$idCuenta}' AND eliminado = 0")){
        $rows = $result->fetch_all(MYSQLI_ASSOC);

        if(!is_null($rows)){
            foreach($rows as $num => $row){
                foreach($row as $key => $value){
                    $data1[$num][$key] = $value;
                }
            }
        }
    } else {
        die('Query Error: '.mysqli_error($conexion));
    }
    echo json_encode($data1, JSON_PRETTY_PRINT);
?>