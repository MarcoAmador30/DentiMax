<?php
    include_once __DIR__.'/database.php';

    $correo = $_GET['correoRegistro'];
    $data1 = array();

    if($result = $conexion->query("SELECT * FROM usuario WHERE correo = '{$correo}' AND eliminado = 0")){
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